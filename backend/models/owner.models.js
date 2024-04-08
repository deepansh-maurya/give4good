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
        id: {
          type: Schema.Types.ObjectId,
          ref: "Admin",
        },
        status: {
          type: String,
          enum: ["appointed", "requested"],
          default: "requested",
        },
      },
    ],
    hashedtoken: {
      type: String,
      required: true,
    },
    verficationCodes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export const Owner = model("Owner", ownerSchema);
