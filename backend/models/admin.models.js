import { Schema } from "mongoose";
import models from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

export const Admin = models("Admin", adminSchema);
