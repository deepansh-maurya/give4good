import { Campaign } from "../models/campaign.models.js";
import axios from "axios";
import Razorpay from "razorpay";
import { Admin } from "../models/admin.models.js";
import { UserProfile } from "../models/userProfile.models.js";
import { Beneficiery } from "../models/beneficiary.model.js";
export const kycOfBeneficiery = async (req, res) => {
  try {
    const {
      name,
      date_of_birth,
      gender,
      nationlaity,
      address,
      documentm,
      beneficiary_relationship,
    } = req.body;
    if (
      [
        name,
        date_of_birth,
        gender,
        nationlaity,
        address,
        documentm,
        beneficiary_relationship,
      ].filter((data) => data != "")
    ) {
      return res
        .status(400)
        .json({ success: false, message: "fill all the fields for kyc " });
    }

    // document verification
    const bene = await Beneficiery.create({
      name,
      date_of_birth,
      gender,
      nationlaity,
      address,
      documentm,
      beneficiary_relationship,
    });
    if (!bene) {
      return res
        .status(401)
        .json({ success: false, message: "kyc failed try again " });
    }

    return res
      .status(200)
      .json({ success: true, message: "kyc successfull, you can proceed" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "server error while kyc" });
  }
};
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

    // handle user updation
    const campaign = await Campaign.create({
      title,
      description,
      story,
      date: new Date().toDateString(),
      tags,
      staus: "active",
      goal,
      deadline,
      image: image || "",
      video: video || "",
      creator: req.user?._id || "661e52b1d0158f33e59db5a5",
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while creating campaign",
    });
  }
};
//kyc
export const getCampaigns = async (req, res) => {
  try {
    const keyword = req.body.tag;
    let campaigns = "";
    if (keyword != "") {
      campaigns = await Campaign.find({ tags: { $in: [keyword] } });
      if (!campaigns) {
        return res.status(404).json({
          success: false,
          message: "campaign not exist with this tag",
        });
      }
    } else {
      campaigns = await Campaign.find({});
    }
    res.status(200).json({
      success: true,
      message: "campaigns found successfully",
      campaigns,
    });
  } catch (error) {
    console.log(error);
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
      description,
      id,
      story,
      tags,
      goal,
      deadline,
      image,
      video,
    } = req.body;
    if (
      [title, description, goal, story, deadline].some(
        (field) => field.trim() == ""
      ) &&
      tags.length > 0
    ) {
      return res.status(401).json({
        success: false,
        message: "wrong credential",
        credential: [title, description, tags, goal, story, deadline],
      });
    }
    const campaign = await Campaign.findOneAndUpdate(
      { _id: id },
      { title, description, story, tags, goal, deadline, image, video },
      { new: true }
    );
    if (!campaign) {
      return res.status(400).json({
        success: false,
        message: "bad request, failed to update campaign",
      });
    }
    return res.status(200).json({
      success: true,
      message: "campaign updated successfully",
      campaign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "system error while updating campaign",
    });
  }
};

export const requestDeleteCampaign = async (req, res) => {
  try {
    const adminArray = await Admin.find({});
    const index = Math.floor(Math.random() * adminArray.length);

    let adminid = adminArray[index]._id;
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error while deletion request in server",
    });
  }
};

export const askForRefund = async (req, res) => {
  try {
    const campaignid = req.body?.id;
    // console.log(campaignid);
    const user = await UserProfile.findById({
      _id: "661e5367d79b469a29a53814",
    });
    const donationTime = user.donationhistory.filter(
      (data) => data.campaignID == campaignid
    );
    // console.log(donationTime);
    const currentTime = new Date();
    // console.log(donationTime[0].time);
    const campaginCreationTime = new Date(donationTime[0].time);
    // console.log(currentTime, campaginCreationTime);
    let timedifference = Math.abs(campaginCreationTime - currentTime);
    // console.log(timedifference);

    timedifference = Math.abs(timedifference / (1000 * 60 * 60));
    // console.log(timedifference);
    if (timedifference <= 24) {
      let instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_KEY_SECRET,
      });

      const paymentDocument = user.donationhistory.filter(
        (data) => data.campaignID == campaignid
      );
      console.log(paymentDocument, "paymentDocument");
      let amount = await instance.payments.fetch(paymentDocument[0].paymentID);
      console.log(amount);
      let response = await instance.payments.refund(
        paymentDocument[0].paymentID,
        {
          amount: amount.amount,
          speed: "normal",
          notes: {
            notes_key_1: "Beam me up Scotty.",
            notes_key_2: "Engage",
          },
          receipt: "Receipt No. 31",
        }
      );
      console.log(response);
      if (response) {
        let donationhistory = user.donationhistory;
        donationhistory = donationhistory.filter((data) => {
          data.campaignID != campaignid;
        });
        console.log(donationhistory);
        await UserProfile.findByIdAndUpdate(
          { _id: "661e5367d79b469a29a53814" },
          { donationhistory: donationhistory }
        );
      } else {
        return res.status(400).json({
          success: false,
          message: "refund failed ",
        });
      }
      return res.status(200).json({
        success: true,
        message: "refund accepted you wil get your amount in 5 to 7 days ",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Time exceeded you cannot ask for refund now",
      });
    }
  } catch (error) {
    console.log(error);
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

export const requestDonationMoney = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.body?.id);
    const isPermitted = campaign.request;
    if (isPermitted === "yes") {
      const beneID = campaign.benefciery;
      const bene = await Beneficiery.findByIdAndUpdate(
        { beneID },
        {
          contact_number: req.body.number,
          account_number: req.body.accountNumber,
          ifsc_code: req.body.ifscCode,
        },
        { new: true }
      );

      // create contact
      let contactData = {
        name: req.user.name,
        email: req.user.email,
        contact: bene.contact_number,
        type: "customer",
      };

      let confToCreateContact = {
        method: "post",
        url: "https://api.razorpay.com/v1/contacts",
        headers: {
          "Content-Type": "application/json",
        },
        data: contactData,
      };
      let contactResponse = await axios(confToCreateContact);
      const updatedBene = await Beneficiery.findByIdAndUpdate(
        { beneID },
        { contact_id: contactResponse.id },
        { new: true }
      );

      // create a fund account
      const fundAccountData = {
        contact_id: updatedBene.contact_id,
        account_type: "bank_account",
        bank_account: {
          name: req.user?.name,
          ifsc: updatedBene.ifsc_code,
          account_number: updatedBene.account_number,
        },
      };
      const confToCreateFundAccount = {
        method: "post",
        url: "https://api.razorpay.com/v1/fund_accounts ",
        headers: {
          "Content-Type": "application/json",
        },
        data: fundAccountData,
      };

      const fundAccountResponse = await axios(confToCreateFundAccount);

      const moreUpdatedBene = await Beneficiery.findByIdAndUpdate(
        { beneID },
        { account_id: fundAccountResponse.id },
        { new: true }
      );

      // create payout
      const payoutdata = {
        account_number: moreUpdatedBene.account_number,
        fund_account_id: moreUpdatedBene.account_id,
        amount: req.body.amount,
        currency: "INR",
        mode: "IMPS",
        purpose: "payout",
      };
      const confToCreatePayout = {
        method: "post",
        url: "https://api.razorpay.com/v1/payouts",
        headers: {
          "Content-Type": "application/json",
        },
        data: payoutdata,
      };
      const payoutResponse = await axios(confToCreatePayout);
      const beneUpdated = await Beneficiery.findByIdAndUpdate(
        { beneID },
        { payout_id: payoutResponse.id },
        { new: true }
      );

      return res
        .status(200)
        .json({ success: true, message: "payout successfull" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal error while payout" });
  }
};
