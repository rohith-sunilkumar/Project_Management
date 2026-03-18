import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const verifyUser = async (req, res, next) => {
  const { Token } = req.cookies;
  if (!Token) {
    return res.status(404).json({
      success: false,
      message: "Access denied Please Login to Access",
    });
  }
  try {
    const decodedData = jwt.verify(Token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedData.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found - Token invalid",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const roleBasedAccess = (...roles) =>{
  return (req,res,next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({ message: "Admin Only - Restricted Page For Users" });
    }
    next()
  }
}