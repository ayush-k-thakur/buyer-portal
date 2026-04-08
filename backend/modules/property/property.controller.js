const mongoose = require("mongoose");
const User = require("../users/user.model");
const Property = require("./property.model")

exports.getAllProperties = async (req, res) => {
  try {
    // Read page and limit from query
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // Prevent abuse
    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    // Query with pagination
    const [properties, total] = await Promise.all([
      Property.find()
        .skip(skip)
        .limit(safeLimit)
        .sort({ createdAt: -1 }),
      Property.countDocuments()
    ]);

    res.json({
      data: properties,
      page,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch property" });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    // Fetch full user from DB
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favouriteIds = user.favourites;

    if (!favouriteIds || favouriteIds.length === 0) {
      return res.json({
        page,
        limit: safeLimit,
        total: 0,
        totalPages: 0,
        data: []
      });
    }

    // Ensure all IDs are valid ObjectIds
    const validIds = favouriteIds.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    const [properties, total] = await Promise.all([
      Property.find({ _id: { $in: validIds } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit),
      Property.countDocuments({ _id: { $in: validIds } })
    ]);

    res.json({
      data: properties,
      page,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch favourites" });
  }
};

exports.toggleFavourite = async (req, res) => {
  try {
    const { propertyId } = req.params;
    console.log(propertyId)

    if (!propertyId) {
      return res.status(400).json({ message: "propertyId is required" });
    }

    const user = await User.findById(req.user.id);

    const alreadyFav = user.favourites.some(
      (id) => id.toString() === propertyId
    );

    if (alreadyFav) {
      user.favourites.pull(propertyId);
      await user.save();
      return res.json({ message: "Removed from favourites" });
    }

    user.favourites.addToSet(propertyId); // prevents duplicates
    await user.save();

    res.json({ message: "Added to favourites" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update favourites" });
  }
};

exports.addProperty = async (req, res) => {
  try {
    const { name, price, location, description } = req.body;

    if (!name || !price || !location) {
      return res.status(400).json({
        message: "Name, Price and Location are required"
      });
    }

    const property = await Property.create({
      name,
      price,
      location,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Property created successfully",
      data: property
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create property"
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (!property.createdBy) {
      return res.status(400).json({
        message: "Property owner missing. Cannot verify permission"
      });
    }

    const ownerId = property.createdBy.toString();
    const userId = req.user.id.toString();
    const userRole = String(req.user.role).toLowerCase();

    const isOwner = ownerId === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to delete this property" });
    }

    await property.deleteOne();

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete property" });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const safeLimit = Math.min(limit, 100);
    const skip = (page - 1) * safeLimit;

    const [properties, total] = await Promise.all([
      Property.find({ createdBy: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(safeLimit),
      Property.countDocuments({ createdBy: req.user.id })
    ]);

    res.json({
      data: properties,
      page,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your properties" });
  }
};