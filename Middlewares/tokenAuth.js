const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const UserModel = require("../Models/userModel");
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }
    const tokenFromHeaders = authorizationHeader.split(" ")[1];
    if (!tokenFromHeaders) {
      return res.status(401).json({
        success: false,
        message: "Token missing, You are not authorized",
      });
    }
    const data = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET_KEY);

    if (!data || !data.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    const user = await UserModel.findById(data.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { authMiddleware };
