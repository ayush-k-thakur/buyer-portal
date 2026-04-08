const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, role, res) => {
    // Generate JWT token with user ID and role, set to expire in 1 day
    const token = jwt.sign(
        { id: userId, role: role.toLowerCase().trim() },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // Set the token in an HTTP-only cookie with appropriate security settings
    // Cross-origin cookies require SameSite=None and Secure in modern browsers.
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
    });
};

module.exports = generateTokenAndSetCookie;