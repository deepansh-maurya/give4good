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
  },
  { timestamps: true }
);

export const Beneficiery = model("Beneficiery", beneficiaryModel);
