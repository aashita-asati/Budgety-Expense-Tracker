
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("\n=== Incoming Protected Request ===");

    if (!authHeader) {

      return res.status(401).json({ message: "No auth header" });
    }



    if (!authHeader.startsWith("Bearer ")) {

      return res.status(401).json({ message: "Wrong token format" });
    }

    const token = authHeader.split(" ")[1];


    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (err) {

      return res.status(401).json({
        message: "Token verification failed",
        error: err.message, // like "jwt malformed", "jwt expired", etc.
      });
    }

    if (!decoded.id) {

      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {

      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (err) {

    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
