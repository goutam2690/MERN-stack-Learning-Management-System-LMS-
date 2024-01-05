import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
  httpOnly: true,
  secure: true,
};

//user registration flow start
const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;


    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }
    if (fullName.length < 3) {
      return next(
        new AppError("Full name must be at least 3 characters long", 400)
      );
    }
    if (fullName.length > 20) {
      return next(
        new AppError("Full name should be less than 20 characters ", 400)
      );
    }

    const emailPattern =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    function isValidEmail(email) {
      return emailPattern.test(email);
    }
    if (!isValidEmail(email)) {
      return next(
        new AppError(`Invalid Email ${email} , please Enter correct email`, 400)
      );
    }

    if (password.length < 5) {
      return next(
        new AppError(
          "Password length is too short, it should have minimum of 5 character.",
          400
        )
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new AppError("User Already Exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      avatar: {
        public_id: email,
        secure_url:
          "https://png.pngtree.com/png-clipart/20210129/ourmid/pngtree-default-male-avatar-png-image_2811083.jpg",
      },
    });

    if (!user) {
      return next(new AppError("user registration failed", 400));
    }

    // :=> file upload
    console.log("file >",JSON.stringify(req.file));
    if(req.file){
      // console.log(req.file)
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder : "Server",
          width : 250,
          height : 250,
          gravity : "faces",
          crop : "fill"

        });

        if(result){
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          //remove file from server

          fs.unlink(`../uploads/${req.file.filename}` , ()=>{
            console.log("image deleted from folder");
          })

        }
      } catch (error) {
        return next(new AppError(error || "file not uploaded, please try again", 500))
      }
    }


    await user.save();

    user.password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, cookieOptions);


    res.status(200).json({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (e) {
    console.log(e.message);
  }
};

//user registration flow end

//user login flow start
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required"));
    } 

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid email or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password"));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "Logged in Successfully",
      user,
    });
  } catch (e) {
    console.log("error", e.message);
  }
};
//user login flow end

//user logout flow start
const logout = async (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "LogOut successful",
    });
};
//user logout flow end

//user information flow start
const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
//user information flow end

//user forgot password flow start
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is Required to reset password"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Email not Registered"));
  }

  const resetToken = await user.generatePasswordResetToken();
  await user.save();

  const resetPasswordUrl = `${process.env.FRONTED_URL}/reset-password/${resetToken}`;
  console.log(resetPasswordUrl);
  const subject = "Reset Your Password";
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset Your Passwword</a> `;

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `Reset Password token has be sent to |${email}| successfully`,
    });
  } catch (e) {
    console.log(e.message);

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();
    return next(new AppError(e.message, 500));
  }
};
//user forgot password flow end

//user reset password flow start
const resetPassword = async (req, res, next) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;
    const forgotPasswordToken = resetToken;

    console.log(resetToken);
    console.log(forgotPasswordToken);

    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    console.log(user);

    // if(forgotPasswordExpiry < new Date(Date.now()) ){
    //   return next(new AppError('Token is Invalid', 401));
    // }

    if (!user) {
      return next(new AppError("Invalid Token, Please Try again", 401));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the reset process
    console.error(error);
    return next(new AppError("An error occurred during password reset", 500));
  }
};
//user reset password flow end

const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const id = req.user;

  if ((!oldPassword, !newPassword)) {
    return next(new AppError("All fields are required !", 400));
  }

  const user = await User.findOne(id).select("+password");

  if (!user) {
    return next(new AppError(`User not found with this ${id}`, 404));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError("Old Password doesn't match!", 403));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};

const updateUser = async (req, res, next) => {
  const { fullName } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User does not Exists", 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if(req.file){
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder : "Server",
        width : "250",
        height: "250",
        gravity : "faces",
        crop : "fill"
      });

      if(result){
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        fs.rm(`../uploads/${req.file.filename}`);
      }
    } catch (error) {
        return next(new AppError(error || 'file not uploaded, please try again', 400));
    }
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "User details updated successfully",
  });
};

export {
  register,
  login,
  logout,
  getMyProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
};
