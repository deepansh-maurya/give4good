import { Owner } from "../models/owner.models.js";
import bcrypt, { hash } from "bcrypt";
import { createTransport } from "nodemailer";
import cryptoRandomString from "crypto-random-string";
export const ownerShip = async (req, res) => {
  try {
    const { email, username, password, role, token } = req.body;
    if (token == process.env.OWNERSHIP_TOKEN) {
      let hashpassword = await bcrypt.hash(password, 10);
      let hashedtoken = await bcrypt.hash(token, 10);
      const owner = await Owner.create({
        email,
        username,
        hashpassword,
        role,
        hashedtoken,
      });

      if (!owner) {
        return res
          .status(400)
          .json({ success: false, message: "failed to become owner try again" })
          .render();
      }
      return res
        .status(200)
        .json({ success: false, message: "you are now a owner" })
        .render();
    } else {
      return res
        .status(400)
        .json({ success: false, message: "you are not allowed to be a owner " })
        .render();
    }
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "internal error while providing ownership",
      })
      .render();
  }
};
export const ownerLogin = async (req, res) => {
  try {
    const { username, password, hashedtokentoken } = req.body;
    const owner = await Owner.findOne({
      username,
    });

    if (!owner) {
      return res.status(401).json({
        success: false,
        messgae: " owner not exist ",
      });
    }
    const hashpassword = await bcrypt.compare(password, owner.hashpassword);
    const hashedtoken = await bcrypt.compare(
      hashedtokentoken,
      owner.hashedtoken
    );
    if (!hashpassword || !hashedtoken) {
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
      id: owner._id,
      username: username,
      email: owner.email,
      role: owner.role,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(userData, secretKey, { header, expiresIn });
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res.status(200).cookie("token", token, options).json({
      success: true,
      messgae: "admin logged in",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: " logged in failed",
    });
  }
};
export const appointAdmin = async (req, res) => {
  try {
    const transporter = createTransport({
      host: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FOR_EMAIL_SERVICE,
        pass: process.env.PASSWORD_FOR_EMAIL_SERVICE,
      },
    });
    const info = await transporter.sendMail({
      from: ` Deepansh <${process.env.EMAIL_FOR_EMAIL_SERVICE}>`,
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      html: `<a href=${req.body.link}>${req.body.linktext}</a>`,
    });

    if (!info) {
      return res.status(400).json({
        success: true,
        message: "email sent unsuccesfully",
      });
    }
    return res.status(400).json({
      success: true,
      message: "email sent succesfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: "system error while sending email ",
    });
  }
};

export const forVerifiactionCode = async (req, res) => {
  try {
    const transporter = createTransport({
      host: "gmail",
      port: 230,
      secure: false,
      auth: {
        user: process.env.EMAIL_FOR_EMAIL_SERVICE,
        pass: process.env.PASSWORD_FOR_EMAIL_SERVICE,
      },
    });
    let codetoverify = cryptoRandomString({ length: 10, type: "alphanumeric" });
    const info = await transporter.sendMail({
      from: ` Deepansh <${process.env.EMAIL_FOR_EMAIL_SERVICE}>`,
      to: req.body.to,
      subject: "Your verification code for password reset",
      text: code,
      html: ``,
    });

    if (!info) {
      return res.status(400).json({
        success: true,
        message: "code sent unsuccesfully",
      });
    }
    return res.status(400).json({
      success: true,
      message: "code sent succesfully",
      codetoverify,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: "system error while sending code ",
    });
  }
};
