const express = require("express");
const ctrl = require("./property.controller");
const auth = require("../../shared/middleware/auth.middleware");
const role = require("../../shared/middleware/role.middleware");

const router = express.Router();

// Get all properties with pagination
router.get("/", auth, ctrl.getAllProperties);

// Get favourite properties of logged in user
router.get("/favourites", auth, ctrl.getFavourites);

// My properties (for sellers)
router.get("/my-listings", auth, role(["seller"]), ctrl.getMyProperties);

// Get property by ID
router.get("/:id", auth, ctrl.getPropertyById);

// Toggle favourite for a property
router.patch("/favourites/:propertyId", auth, ctrl.toggleFavourite);

// Add new property
router.post("/", auth, role(["seller", "admin"]), ctrl.addProperty);

// Delete property
router.delete("/:id", auth, role(["seller", "admin"]), ctrl.deleteProperty);

module.exports = router;