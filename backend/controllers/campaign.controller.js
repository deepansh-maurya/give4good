import { Campaign } from "../models/campaign.models.js";
import { Admin } from "../models/admin.models.js";
import { UserProfile } from "../models/userProfile.models.js";
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
    let adminid = req.user.id;
    let admin = await Admin.findById(adminid);
    let campaignsToDelete = admin.campaignsToDelete;
    campaignsToDelete.push(req.body?.id);
    let updatedadmin = await Admin.findByIdAndUpdate(
      { _id: adminid },
      { campaignsToDelete: campaignsToDelete },
      { new: true }
    );
    if (!updatedadmin) {
      return res.status(400).json({
        success: false,
        message: "request unsuccessfull try again",
      });
    }
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

export const askForRefund = async (req, res) => {
  try {
    const userid = req.user.id;
    const campaignid = req.body.id;
    const user = await UserProfile.findById({ _id: userid });
    const donationTime = user.donationhistory.time;
    const currentTime = new Date();
    const timedifference = donationTime - currentTime;
    timedifference = Math.abs(timedifference / (100 * 60 * 60));
    if (timedifference >= 24) {
      let instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_KEY_SECRET,
      });

      const paymentDocument = user.donationhistory.filter((data) => {
        data.campaignID == campaignid;
      });
      let amount = await instance.payments.fetch(paymentDocument.paymentID);

      let response = await instance.payments.refund(paymentDocument.paymentID, {
        amount: amount,
        speed: "normal",
        notes: {
          notes_key_1: "Beam me up Scotty.",
          notes_key_2: "Engage",
        },
        receipt: "Receipt No. 31",
      });
      if (response) {
        const donationhistory = user.donationhistory;
        donationhistory = donationhistory.filter((data) => {
          data.campaignID != campaignid;
        });
        await UserProfile.findByIdAndUpdate(
          { _id: userid },
          { donationhistory: donationhistory }
        );
      } else {
        return res.status(400).json({
          success: true,
          message: "refund failed ",
        });
      }
      return res.status(200).json({
        success: true,
        message: "refund accepted you wili get your amount in 5 to 7 days ",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Time exceeded you cannot ask for refund now",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "An error occurred while processing the refund. Please try again later.",
    });
  }
};
//controller for the admin route
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
//controller for admin route
export const toAcceptCampaignDeletionByAdmin = async (req, res) => {
  // handle refund
  try {
    const reply = req.body.reply;
    const userId = req.body.userid;
    if (reply === "yes") {
      const id = req.body.id;
      const campaign = await Campaign.findByIdAndDelete({ _id: id });
      const user = await UserProfile.find({ _id: userId });
      const refundhistory = user.refundhistory;
      refundhistory = refundhistory.filter((data, index) => {
        data.campaignID != id;
      });
      let updatedUser = await UserProfile.findByIdAndUpdate(
        { _id: userId },
        { refundhistory: refundhistory },
        {
          new: true,
        }
      );
      if (!campaign || !updatedUser) {
        return res.status(400).json({
          success: false,
          message: "campaign deletion unsuccessfull",
        });
      }
      return res.status(200).json({
        success: true,
        message:
          "campaign deletion successfull and donation refunded to the respected donors",
      });
    } else {
      let instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_KEY_SECRET,
      });
      const user = await UserProfile.find({ _id: userId });
      const paymentid = user.refundhistory.paymentID;
      let amount = await instance.payments.fetch(paymentId);
      let response = await instance.payments.refund(paymentid, {
        amount: amount,
        speed: "normal",
        notes: {
          notes_key_1: "Beam me up Scotty.",
          notes_key_2: "Engage",
        },
        receipt: "Receipt No. 31",
      });

      return res.status(200).json({
        success: true,
        message: "your request denied, try again after sometime  ",
      });
    }
  } catch (error) {
    return req.status(500).json({
      success: false,
      message: "error while deleting the campaign in server",
    });
  }
};
