import { Schema } from "mongoose";
import { model } from "mongoose";

const shippingGoodsSchema = new Schema(
  {
    order_id: {
      type: String,
    },
    channel_order_id: {
      type: String,
    },
    shipment_id: {
      type: String,
    },
    awn_data: {
      type: String,
    },
    shipped_by: {
      type: String,
    },
    shipped_response: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Shippedgood = model("Shippedgood", shippingGoodsSchema);
