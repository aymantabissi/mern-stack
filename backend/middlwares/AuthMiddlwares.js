import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        token = authHeader.split(" ")[1]; // Extract token

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
        console.log("Decoded user:", req.user);

        next(); // Move next() only if the token is valid
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(500).json({ message: "Server error during authentication" });
    }
};
