const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, role, res) => {
    // Generate JWT token with user ID and role, set to expire in 1 day
    const token = jwt.sign(
        { id: userId, role: role.toLowerCase().trim() },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // Set the token in an HTTP-only cookie with appropriate security settings
    // Cross-origin cookies require SameSite=None, and secure should be enabled in production only.
    res.cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in ms
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
    });
};

module.exports = generateTokenAndSetCookie;