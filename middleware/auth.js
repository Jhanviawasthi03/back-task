const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.auth = (req, res, next) => {
    try {
        
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing, please log in first.",
            });
        }

        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; 
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token, please log in again.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred during authentication.",
        });
    }
};


exports.roleCheck = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (req.user.role !== requiredRole) {
                return res.status(403).json({
                    success: false,
                    message: `Access restricted to ${requiredRole}s only.`,
                });
            }
            next();
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "An error occurred while checking role.",
            });
        }
    };
};



