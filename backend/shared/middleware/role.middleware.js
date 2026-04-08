// Middleware to check user roles for access control
module.exports = (allowedRoles) => {
    // Return a middleware function that checks the user's role against allowed roles
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            console.log(req.user);
            return res.status(403).json({ message: "Access Denied" });
        }
        next();
    };
};