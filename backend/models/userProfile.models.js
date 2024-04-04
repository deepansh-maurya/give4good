import mongoose from "mongoose";
import { Schema } from "mongoose";
import { model } from "mongoose";

const userProfileSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    campaigns: [
      {
        type: String,
      },
    ],
    donationhistory: [{ type: String }],
    profilePicture: {
      type: String,
    },
    bio: {
      type: String,
    },
    links: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const UserProfile = model("UserProfile", userProfileSchema);
