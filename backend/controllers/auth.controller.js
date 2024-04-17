import { UserProfile } from "../models/userProfile.models.js";
import bcrypt from "bcrypt";
import { Campaign } from "../models/campaign.models.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";
import { Owner } from "../models/owner.models.js";
dotenv.config({ path: "./env" });
export const registerUser = async (req, res) => {
  console.log("Sdf");
  try {
    const { username, email, password } = req.body;
    if (
      email != "" &&
      email.includes("@gmail.com") &&
      username != "" &&
      password != "" &&
      password.length > 8
    ) {
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
      console.log(register);
      return res.status(201).json({
        success: true,
        message: "user registered",
      });
    } else {
      return res.status(401).json({
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
    const { username, password, role } = req.body;
    const user = "";
    if (role == "donor") {
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
        messgae: " user is not signed up",
      });
    }
    const hashpassword = await bcrypt.compare(password, user.hashpassword);
    if (!hashpassword) {
      return res.status(401).json({
        success: false,
        messgae: "wrong passsword",
      });
    }
    // creating a jwt token
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
    console.log(token);
    return res.status(200).cookie("token", token, options).json({
      success: true,
      messgae: "user logged in",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: " logged in failed",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (newPassword <= 8) {
      return res.status(401).json({
        success: false,
        messgae: "wrong credentail",
        newPassword,
      });
    }
    const user = await UserProfile.findById(req.user._id);
    const hashpassword = await bcrypt.compare(oldPassword, user.hashpassword);
    if (!hashpassword) {
      return res.status(401).json({
        success: false,
        messgae: "wrong passsword",
      });
    }
    await UserProfile.findByIdAndUpdate(
      req.user?._id,
      { hashpassword: newPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "password changes succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "erorr while changing the password",
    });
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
