import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

// export const isAuthenticated = async(req , res , next) => {
//  try {
//     const { token } = req.cookies;

//     if(!token){
//         res.status(400).json({
//             success:  false,
//             message : "You are not Logged In , Please login first"
//         });
//     }

//     const decodedData = await jwt.verify(token , process.env.JWT_SECRET);

//     req.user = await User.findById(decodedData._id);
//     console.log(req.user)

//     next();
//  } catch (error) {
//     console.log(error)
//  }
// }

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "You are not Logged In, Please login first",
      });
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);
    console.log(req.user);

    next();
  } catch (error) {
    console.log(error);
    // You might want to return an error response here if token verification fails.
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const authorizedRoles =
  (...roles) =>
  (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError("You Don't Have permission to access this route", 400)
      );
    }

    next();
  };

// export const authorizedSubscriber = (req, res, next) => {
//   const currentUserRole = req.user.role;
//   const subscription = req.user.subscription;

//   if (currentUserRole !== "ADMIN" && subscription !== "active") {
//     return next(new AppError("Please Subscribe to Access This Route !!", 403));
//   }

//   next();
// };

export const authorizedSubscriber = (req, res, next) => {
  const { role: currentUserRole, subscription } = req.user;

  if (currentUserRole === "ADMIN" || subscription === "active") {
    return next();
  }

  return next(new AppError("Subscription required to access this route.", 403));
};

