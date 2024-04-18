import { Schema, model } from "mongoose";

const beneficiaryModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationlaity: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    beneficiary_relationship: {
      type: String,
      required: true,
    },

    // for getting funds out
    contact_number: {
      type: Number,
    },
    contact_id: {
      type: String,
    },
    ifsc_code: {
      type: String,
    },
    account_number: {
      type: Number,
    },
    account_id: {
      type: String,
    },
    payout_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Beneficiery = model("Beneficiery", beneficiaryModel);
