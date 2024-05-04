import { UserProfile } from "../models/userProfile.models.js";
import bcrypt from "bcrypt";
import { Campaign } from "../models/campaign.models.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";
import { Owner } from "../models/owner.models.js";
import fs from "fs";
import { emailservice } from "../utils/emailservice.js";
import { upoadFile } from "../utils/cloudinary.js";
import { upload } from "../middlwares/multer.middleware.js";
import { Beneficiery } from "../models/beneficiary.model.js";
import mongoose from "mongoose";
dotenv.config({ path: "./env" });
// report
export const checkauthstatus = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "you are loggin in" });
  } catch (error) {
    return res
      .staus(500)
      .json({ succcess: false, message: "you are not logged in" });
  }
};
export const getProfile = async (req, res) => {
  try {
    let user;
    console.log(req.body.id);
    if (req.body.user) {
      console.log(1);
      user = await UserProfile.findById(
        new mongoose.Types.ObjectId(req.body.id)
      );
    } else if (req.body.beneficiery) {
      user = await Beneficiery.findById(
        new mongoose.Types.ObjectId(req.body.id)
      );
      console.log(user);
    }
    const name = user?.name || "";
    if (!name)
      return res
        .status(404)
        .json({ success: false, message: "no name found", name: "" });
    return res.status(200).json({ success: true, message: "name found", name });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "error, name not found" });
  }
};
export const registerUser = async (req, res) => {
  console.log("Request accpeted");
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (email != "" && username != "" && password != "") {
      const existedUser = await UserProfile.findOne({
        $or: [{ username }, { email }],
      });
      if (existedUser) {
        return res.status(400).json({
          success: false,
          message: "user already existed",
        });
      }
      let hashpassword = await bcrypt.hash(password, 10);
      console.log(hashpassword);
      const register = await UserProfile.create({
        email,
        hashpassword,
        username,
      });
      if (!register) {
        return res.status(400).json({
          success: false,
          message: "user register failed",
        });
      }

      // TODO: handle confirmation email

      emailservice(register.email, `Welcome to GIVE4GOOD!`, register.username);

      return res.status(201).json({
        success: true,
        message: "user registered,log in to proceed",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "wrong credentials",
        email,
        password,
        username,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while registering",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, role } = req.body;
    console.log(username, password, role);
    let user;
    if (role == "donor") {
      console.log(user);
      user = await UserProfile.findOne({
        username,
      });
    } else if (role == "admin") {
      user = await Admin.findOne({
        username,
      });
    } else {
      user = await Owner.findOne({
        username,
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: " user is not signed up",
      });
    }
    const hashpassword = await bcrypt.compare(password, user.hashpassword);
    if (!hashpassword) {
      return res.status(401).json({
        success: false,
        message: "wrong passsword",
      });
    }
    const header = {
      alg: "HS256",
      typ: "JWT",
    };
    const expiresIn = "1d";
    const userData = {
      id: user._id,
      username: username,
      email: user.email,
      role: user.role,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(userData, secretKey, { header, expiresIn });
    const options = {
      httpOnly: true,
      secure: true,
    };
    console.log(token, "Sdf");
    return res.status(200).cookie("token", token, options).json({
      success: true,
      message: "you are logged in",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " logged in failed",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (newPassword <= 8) {
      return res.status(401).json({
        success: false,
        messgae: "wrong credential",
        newPassword,
      });
    }
    const user = await UserProfile.findById(req.user._id);
    const hashpassword = await bcrypt.compare(oldPassword, user.hashpassword);
    if (!hashpassword) {
      return res.status(401).json({
        success: false,
        messgae: "wrong old passsword",
      });
    }
    await UserProfile.findByIdAndUpdate(
      req.user?._id,
      { hashpassword: newPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "password changed succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "erorr while changing the password",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user._id);

    if (user) {
      if (user.username != req.body.username) {
        let username = req.body.username;
        let user = await UserProfile.find({ username });
        if (user.length > 0) {
          return res
            .status(400)
            .json({ sucess: false, message: "username already taken" });
        }
      }
    } else {
      return res
        .status(400)
        .json({ success: false, msessage: "you are not authenticated" });
    }
    const { name, username, email, address } = req.body;

    if (
      name == "" &&
      document == "" &&
      profilePicture == "" &&
      email == "" &&
      address == "" &&
      username == ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "empty fields cannot be updated" });
    }

    const updateduser = await UserProfile.findByIdAndUpdate(
      req.user._id,
      {
        name: name,
        username: username,
        email: email,
        address: address,
      },
      { new: true }
    );
    if (!updateduser) {
      return res
        .status(400)
        .json({ success: false, message: "updation failed, try agian" });
    }
    return res.status(200).json({
      success: true,
      message: "profile updated successfully",
      updateduser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "profile updation failed" });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const documentPath = req.file?.path;
    const document = await upoadFile(documentPath);
    if (!document)
      return res
        .status(500)
        .json({ success: true, message: "Document updation failed" });
    const user = await UserProfile.findByIdAndUpdate(
      req.user._id,
      {
        document,
      },
      { new: true }
    );
    if (!user)
      return res
        .status(500)
        .json({ success: true, message: "Document updation failed" });
    return res
      .status(200)
      .json({ success: true, message: "Document updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Document updation failed" });
  }
};
export const updateProfilePicture = async (req, res) => {
  try {
    const profilePIcturePath = req.file?.path;
    const profilePicture = await upoadFile(profilePIcturePath);
    if (!profilePicture)
      return res
        .status(500)
        .json({ success: true, message: "Picture updation failed" });
    const user = await UserProfile.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture,
      },
      { new: true }
    );
    if (!user)
      return res
        .status(500)
        .json({ success: true, message: "Picture updation failed" });
    return res
      .status(200)
      .json({ success: true, message: "Picture updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: true, message: "Picture updation failed" });
  }
};
export const userProfile = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user._id).select(
      "-hashpassword"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "user found", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal error, User not found" });
  }
};

// handle refund
export const deleteAccount = async (req, res) => {
  //transfer ownership , notifying user about campaigns
  try {
    const id = req.user?.id;
    await Campaign.deleteMany({ creator: id });
    await UserProfile.findByIdAndDelete({ _id: id });
    return res.status(200).clearCookie("token").json({
      success: true,
      message: "user deleted succesfully",
    });
  } catch (erorr) {
    return res.status(500).json({
      success: true,
      message: "error while deleting the user ",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const code = req.body.code;
    const toVerify = req.body.codetoverify;
    if (code !== toVerify) {
      return res.status(400).json({
        success: false,
        messge: "invalid code",
      });
    }

    const newPassword = req.body.newpassword;
    const confirmPAssword = req.body.confirmpassword;
    if (newPassword !== confirmPAssword) {
      return res
        .status(400)
        .json({ success: false, message: "password not matched" });
    }

    let hashpassword = await bcrypt.hash(password, 10);

    const user = await UserProfile.findByIdAndUpdate(
      { _id: req.user.id },
      { hashpassword }
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "password changed failed" });
    }
    return res
      .status(200)
      .json({ success: false, message: "password changed successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal error while changing password",
    });
  }
};
export const adminregister = async (req, res) => {
  // try {
  //   const { email, username, password, role } = req.body;
  //   if (
  //     email != "" &&
  //     email.includes("@gmail.com") &&
  //     username != "" &&
  //     password != "" &&
  //     password.length > 8 &&
  //     role != ""
  //   ) {
  //     const existedadmin = await Admin.findOne({
  //       $or: [{ username }, { email }],
  //     });
  //     if (existedadmin) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "admin already existed",
  //       });
  //     }
  //     let hashpassword = await bcrypt.hash(password, 10);
  //     const admin = await Admin.create({
  //       email,
  //       username,
  //       hashpassword,
  //       role,
  //     });
  //     if (!admin) {
  //       return res
  //         .status(400)
  //         .json({ success: false, message: "failed to become admin try again" })
  //         .render();
  //     }
  //     return res
  //       .status(200)
  //       .json({ success: true, message: "you are now a admin" })
  //       .render();
  //   }
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .json({
  //       success: false,
  //       message: "internal error while admin registeration",
  //     })
  //     .render();
  // }
  return res.render("form");
};
export const handleSubmitForm = async (req, res) => {
  try {
    const admin = await Admin.create({
      email: req.body.email,
      username: req.body.username,
      hashpassword: req.body.password,
      role: req.body.admin,
    });
    console.log(admin);
    return res.status(200).send("welcome admin, now login into the app");
  } catch (error) {
    console.log(error);
    return res.status(500).send("failed to become admin try again");
  }
};

// similar route for admin change password, delete, forget
