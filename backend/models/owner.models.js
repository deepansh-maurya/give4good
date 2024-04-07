import { Schema, model } from "mongoose";

const ownerSchema = new Schema(
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
    role: {
      type: String,
      default: "owner",
    },
    adminlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    hashedtoken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Owner = model("Owner", ownerSchema);
