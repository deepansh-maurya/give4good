import { Schema } from "mongoose";
import { model } from "mongoose";

const campaigneSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    fundedAmount: {
      type: String,
    },

    story: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    image: {
      type: String,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    video: {
      type: String,
    },
    date: {
      type: Number,
    },
    deadline: {
      type: String,
    },
    progress: {
      type: Number,
    },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        comment: {
          type: String,
        },
      },
    ],
    report: [
      {
        user: { type: Schema.Types.ObjectId, ref: "UserProfile" },
        comment: {
          type: String,
        },
      },
    ],
    shares: {
      type: Number,
    },
  },

  { timestamps: true }
);

export const Campaign = model("Campaign", campaigneSchema);
