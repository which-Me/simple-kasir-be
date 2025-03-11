const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "token cannot be empty" });

  try {
    jwt.verify(token, process.env.jwt_key);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token expired" });
    }
    return res.status(401).json({ message: "invalid token" });
  }
};
