import { Schema } from "mongoose";
import { model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
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
    campaignsToDelete: [
      {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
      },
    ],
    role: {
      type: String,
      required: true,
      default: "admin",
    },
    reportToCampaign: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "UserProfile",
        },
        campaign: {
          type: Schema.Types.ObjectId,
          ref: "Campaign",
        },
        message: { type: String },
      },
    ],
    reportToGoods: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "UserProfile",
        },
        message: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Admin = model("Admin", adminSchema);
