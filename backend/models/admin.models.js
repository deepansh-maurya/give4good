import { Schema } from "mongoose";
import models from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    campaignsToDelete: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Campaign",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Admin = models("Admin", adminSchema);
