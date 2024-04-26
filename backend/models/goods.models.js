import { Schema } from "mongoose";
import { model } from "mongoose";

const goodsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    donor: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    category: {
      type: String,
      required: true,
      enum: [],
    },
    quantity: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: [],
    },
    description: {
      type: String,
      required: true,
    },
    boughtdate: {
      type: String,
      required: true,
    },
    expirydate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "acquired"],
    },
    resaonOfDonation: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
    },
    brand: {
      type: String,
    },
    weight: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Goods = model("Goods", goodsSchema);
