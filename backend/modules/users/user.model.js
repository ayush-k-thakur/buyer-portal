const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "buyer", enum: ["buyer", "seller", "admin"] },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]
});

module.exports = mongoose.model("User", userSchema);