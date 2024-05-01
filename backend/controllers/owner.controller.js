import { Owner } from "../models/owner.models.js";
import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";
import cryptoRandomString from "crypto-random-string";
import { loginUser } from "./auth.controller.js";
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

export const appointAdmin = async (req, res) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
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
      html: `<a href=http://localhost:3000/api/v1/admin-register>register as admin</a>`,
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
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_FOR_EMAIL_SERVICE,
        pass: process.env.PASSWORD_FOR_EMAIL_SERVICE,
      },
    });
    let codetoverify = cryptoRandomString({ length: 10, type: "alphanumeric" });
    console.log(codetoverify);
    const info = await transporter.sendMail({
      from: ` Deepansh <${process.env.EMAIL_FOR_EMAIL_SERVICE}>`,
      to: req.user.email,
      subject: "Your verification code for password reset",
      text: codetoverify,
      html: ``,
    });

    if (!info) {
      return res.status(400).json({
        success: false,
        message: "code sent unsuccesfully,try again",
      });
    }
    return res.status(400).json({
      success: true,
      message: "code sent succesfully, check gmail",
      codetoverify,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "code sent unsuccesfully,try again",
    });
  }
};
