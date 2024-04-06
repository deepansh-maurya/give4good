import { Campaign } from "../models/campaign.models.js";
import { Admin } from "../models/admin.models.js";
export const createCampaign = async (req, res) => {
  try {
    const { title, description, story, tags, goal, deadline, image, video } =
      req.body;
    let ans = [title, description, tags, goal, story, deadline];
    console.log("0.5", ans);
    if (
      [title, description, goal, story, deadline].some(
        (field) => field.trim() == ""
      ) &&
      fields.length > 0
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
    return res.status(200).json({
      success: true,
      message: "campaign created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while creating campaign",
    });
  }
};

export const getCampaigns = async (req, res) => {
  try {
    const keyword = req.query.tag;
    const campaigns = await Campaign.find({ tags: { $in: [keyword] } });
    if (!campaigns) {
      return res.status(404).json({
        success: false,
        message: "campaign not exist with this tag",
      });
    }
    res.status(200).json({
      success: true,
      message: "campaigns found successfully",
      campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while getting campaigns",
    });
  }
};

export const updateCampaign = async (req, res) => {
  try {
    const {
      title,
      id,
      description,
      story,
      tags,
      goal,
      deadline,
      image,
      video,
    } = req.body;
    const campaign = await Campaign.findOneAndUpdate(
      { _id: id },
      { title, description, story, tags, goal, deadline, image, video },
      { new: true }
    );

    if (campaign.length == 0) {
      res.status(400).json({
        success: false,
        message: "bad request, failed to update campaign",
      });
    }
    res.status(200).json({
      success: true,
      message: "campaign updated successfully",
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "system error while updating campaign",
    });
  }
};

export const requestDeleteCampaign = async (req, res) => {
  try {
    await Admin.create({ campaignsToDelete: req.body?.id });
    return res.status(200).json({
      success: true,
      message: "requested submitted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while deletion request in server",
    });
  }
};

export const listOfCampaignsToBeDeleted = async (req, res) => {
  // handle refund
  try {
    const admin = await Admin.findById({ _id: req.user.id });
    let campaigns;
    for (let i = 0; i < admin.campaignsToDelete; i++) {
      campaigns.push(await Campaign.findById({ _id: i.id }));
    }
    if (!campaigns) {
      return res.status(404).json({
        success: true,
        message: "no campaigns request to delete",
      });
    }
    return res.status(200).json({
      success: true,
      message: "campaigns request to delete successfull",
      campaigns,
    });
  } catch (error) {
    return res.status(500).json({
      succcess: false,
      message: "internal error while getting the list",
    });
  }
};

export const toAcceptCampaignDeletionByAdmin = async (req, res) => {
  // handle refund
  try {
    const id = req.body.id;
    const campaign = await Campaign.findByIdAndUpdate({ _id: id });
    if (!campaign) {
      return res.status(400).json({
        success: false,
        message: "campaign deletion unsuccessfull",
      });
    }
    return res.status(200).json({
      success: false,
      message: "campaign deletion successfull",
    });
  } catch (error) {
    return req.status(500).json({
      success: false,
      message: "error while deleting the campaign in server",
    });
  }
};
