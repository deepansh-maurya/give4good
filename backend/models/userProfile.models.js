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
    hashpassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "donor",
    },
    campaigns: [
      {
        type: String,
      },
    ],
    donationhistory: [
      {
        paymentID: {
          type: String,
          required: true,
        },
        orderID: { type: String, required: true },
        signature: { type: String, required: true },
        campaignID: {
          type: Schema.Types.ObjectId,
          ref: "Campaign",
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    refundhistory: [
      {
        paymentID: {
          type: String,
          required: true,
        },
        orderID: { type: String, required: true },
        signature: { type: String, required: true },
        campaignID: {
          type: Schema.Types.ObjectId,
          ref: "Campaign",
          required: true,
        },
      },
    ],
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
    donatedGood: [
      {
        type: Schema.Types.ObjectId,
        ref: "Goods",
      },
    ],
  },
  { timestamps: true }
);

export const UserProfile = model("UserProfile", userProfileSchema);
