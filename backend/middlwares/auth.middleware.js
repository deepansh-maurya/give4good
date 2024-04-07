import jwt from "jsonwebtoken";
import { UserProfile } from "../models/userProfile.models.js";
import { Admin } from "../models/admin.models.js";
export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "not authentic user",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserProfile.findById(decodedToken.id);
    const role =
      decodedToken.role == "owner" ||
      decodedToken.role == "admin" ||
      decodedToken.role == "donor";
    if (!user || !role) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while authentication",
    });
  }
};
export const authenticationMiddlewareForAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "not authentic admin",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await Admin.findById(decodedToken.id);
    const role = decodedToken.role == "admin";
    if (!admin || !role) {
      return res.status(404).json({
        success: false,
        message: "admin not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while authentication",
    });
  }
};
export const authenticationMiddlewareForOwner = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "not authentic admin",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const owner = await Admin.findById(decodedToken.id);
    const role = decodedToken.role == "owner";
    if (!owner || !role) {
      return res.status(404).json({
        success: false,
        message: "owner not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while authentication",
    });
  }
};
