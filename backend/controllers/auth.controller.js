import { UserProfile } from "../models/userProfile.models.js";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./env" });
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    console.log("yaha par");

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
      console.log("yaha par 1");

      if (existedUser) {
        return res.status(400).json({
          success: false,
          message: "user already existed",
        });
      }
      console.log(password, "abb yaha kya ");
      let hashpassword = await bcrypt.hash(password, 10);
      console.log(username, email, hashpassword);

      console.log("yaha par2");

      const register = await UserProfile.create({
        email,
        hashpassword,
        username,
      });
      console.log("yaha par3");

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
    const { username, password } = req.body;
    const user = await UserProfile.findOne({
      username,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        messgae: " user is not logged in",
      });
    }
    console.log(user, !user);
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
      username: username,
      email: user.email,
    };
    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(userData, secretKey, { header, expiresIn });
    console.log(token);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, options).json({
      success: true,
      messgae: "user logged in",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messgae: " logged in failed",
    });
  }
};
