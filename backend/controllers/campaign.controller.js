import { Campaign } from "../models/campaign.models.js";
export const createCampaign = async (req, res) => {
  try {
    const { title, description, story, tags, goal, deadline, image, video } =
      req.body;
    if (
      [title, description, tags, goal, story, deadline].some(
        (field) => field.trim() == ""
      )
    ) {
      return res.status(401).json({
        success: false,
        message: "wrong credential",
        credential: [title, description, tags, goal, story, deadline],
      });
    }

    const campaign = await Campaign.create({
      title,
      description,
      story,
      tags,
      staus: "active",
      goal,
      deadline,
      image: image || "",
      video: video || "",
    });

    if (!campaign) {
      return res.status(401).json({
        success: false,
        message: "failed to create campaign ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while creating campaign",
    });
  }
};
