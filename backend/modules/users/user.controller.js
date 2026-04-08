const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const generateTokenAndSetCookie = require('../../shared/utils/generateToken')

exports.register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    // Validate mandatory fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize input for consistent storage
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = role ? role.trim().toLowerCase() : "buyer";

    /* ---------- Email validation ---------- */
    if (!validator.isEmail(cleanEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    /* ---------- Name validation ---------- */
    if (!validator.isLength(cleanName, { min: 2, max: 50 })) {
      return res.status(400).json({ message: "Name must be 2 to 50 characters" });
    }

    /* ---------- Password match ---------- */
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    /* ---------- Strong password rule ---------- */
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include upper, lower, number, and special character",
      });
    }

    // Prevent duplicate users
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Securely hash password
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create new user document
    const user = new User({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role: cleanRole
    });

    await user.save();
    generateTokenAndSetCookie(user._id, user.role, res); // Automatically log in after registration

    res.status(201).json({ message: "User created successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err); // Log for debugging without exposing details to client
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required login fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize email for consistent lookup
    const cleanEmail = email.trim().toLowerCase();

    // Verify user exists
    const user = await User.findOne({ email: cleanEmail });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare provided password with stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate authentication token and set secure cookie
    generateTokenAndSetCookie(user._id, user.role, res);

    res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
}

exports.getMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Not authenticated" });
  }
};