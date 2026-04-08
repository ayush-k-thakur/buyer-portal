// Backend entry point
// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules 
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./shared/config/db");
const userRoutes = require("./modules/users/user.routes");
const propertyRoutes = require("./modules/property/property.routes");

// Initialize Express app
const app = express();

// Middleware setup
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,https://realestateportal.vercel.app").split(",");
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Basic route to test server
app.get("/", (req, res) => {
    res.status(200).json({ message: "This is Techkraft Full Stack Assignment API" });
});

// Use routes for users and properties
app.use("/users", userRoutes);
app.use("/property", propertyRoutes);

// Start the server
app.listen(5000, () => console.log("Server running on 5000"));