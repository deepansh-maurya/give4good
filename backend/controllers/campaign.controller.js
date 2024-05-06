import { Campaign } from "../models/campaign.models.js";
import Razorpay from "razorpay";
import axios from "axios";
import { Admin } from "../models/admin.models.js";
import { UserProfile } from "../models/userProfile.models.js";
import { Beneficiery } from "../models/beneficiary.model.js";
import { notification } from "../utils/noti.utils.js";
import { upoadFile } from "../utils/cloudinary.js";
import mongoose, { Schema, mongo } from "mongoose";
//comment reammaning , report
// TODO: handle large videos
export const kycOfBeneficiery = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      dateOfBirth,
      gender,
      nationality,
      address,
      city,
      contact,
      document,
      beneficiaryRelationship,
    } = req.body;
    if (
      name == "" &&
      dateOfBirth == "" &&
      gender == "" &&
      nationality == "" &&
      address == "" &&
      document == "" &&
      beneficiaryRelationship == "" &&
      contact == ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "fill all the fields for kyc " });
    }

    if (!req.file || !req.file.path)
      return res
        .status(400)
        .json({ succcess: false, message: "DOcument required" });

    const documentPath = req.file.path;
    const documentUrl = await upoadFile(documentPath);

    // document verification
    const bene = await Beneficiery.create({
      name,
      date_of_birth: dateOfBirth,
      gender,
      nationlaity: nationality,
      address,
      city,
      document: documentUrl,
      beneficiary_relationship: beneficiaryRelationship,
    });
    if (!bene) {
      return res.status(401).json({
        success: false,
        message: "kyc failed try again ",
      });
    }
    return res.status(200).json({
      success: true,
      message: "kyc successfull, you can proceed",
      beneId: bene._id,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "KYC failed, Try again  " });
  }
};
export const createCampaign = async (req, res) => {
  try {
    const { title, description, goal, story, tags, city, deadline, category } =
      req.body;
    if (
      title == "" &&
      description == "" &&
      goal == "" &&
      tags == "" &&
      story == "" &&
      deadline == "" &&
      category == "" &&
      city == ""
    ) {
      return res.status(400).json({
        success: false,
        message: "wrong credential",
        credential: [title, description, tags, goal, story, deadline],
      });
    }

    console.log(city);

    if (
      !req.files ||
      !Array.isArray(req.files.image) ||
      !req.files.image.length > 0
    )
      return res
        .status(400)
        .json({ success: false, message: "All fileds required" });
    if (
      !req.files ||
      !Array.isArray(req.files.video) ||
      !req.files.video.length > 0
    )
      return res
        .status(400)
        .json({ success: false, message: "All fileds required" });

    const imagePAth = req.files.image[0].path;
    const videoPath = req.files.video[0].path;

    const imageURL = await upoadFile(imagePAth);
    const videoURL = await upoadFile(videoPath);

    console.log(imageURL, videoURL);

    if (!imageURL || !videoURL)
      return res.status(400).json({
        success: false,
        message: "Failed to create campaign Try again",
      });
    console.log(req.params.id, "id");
    const campaign = await Campaign.create({
      title,
      description,
      story,
      date: new Date(),
      tags,
      staus: "active",
      goal,
      deadline,
      city,
      category,
      image: imageURL,
      video: videoURL,
      creator: req.user?._id,
      benefciery:
        req.params.id == "null"
          ? req.user._id
          : new mongoose.Types.ObjectId(req.params?.id),
    });

    const user = await UserProfile.findById(req.user._id);
    let userCampaign = user.campaigns;
    console.log(userCampaign);
    userCampaign.push(campaign._id);
    console.log(userCampaign);
    const updatedUser = await UserProfile.findByIdAndUpdate(
      req.user._id,
      {
        campaigns: userCampaign,
      },
      { new: true }
    );

    console.log(updatedUser);

    if (!campaign || !updatedUser) {
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

export const isDonatedOrNot = async (req, res) => {
  try {
    const user = await UserProfile.findById(req.user._id);
    const history = user.donationhistory;
    const value = history.filter((data) => data.campaignID == req.body.id);
    console.log(value);
    if (!value)
      return res
        .status(404)
        .json({ success: false, message: "no donation for this campagin" });
    return res.status(200).json({ success: true, message: "donation found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal error" });
  }
};

export const getCampaignsByTagAndSearch = async (req, res) => {
  try {
    console.log("SDFDSF");

    if (req.body.city) {
      let campaigns = await Campaign.find({ city: { $in: req.body.city } });
      if (!campaigns) {
        return res.status(404).json({
          success: false,
          message: "campaign not exist for this location",
        });
      }
      return res.status(200).json({
        success: true,
        message: "campaigns found successfully",
        campaigns,
      });
    } else if (req.body.city == "Select Location") {
      let campaigns = await Campaign.find({ city: { $in: req.body.city } });
      if (!campaigns) {
        return res.status(404).json({
          success: false,
          message: "campaign not exist for this location",
        });
      }
      return res.status(200).json({
        success: true,
        message: "campaigns found successfully",
        campaigns,
      });
    }
    console.log("SDFDSF");
    const keyword = req.body.tags;
    console.log(keyword);
    let campaigns = "";
    if (keyword != "" && keyword != undefined && keyword != null) {
      campaigns = await Campaign.find({ tags: { $in: [keyword] } });
      console.log("yaha bhi");
      if (campaigns.length == 0) {
        console.log("aa gay");
        campaigns = await Campaign.find({
          title: { $regex: keyword, $options: "i" },
        });

        if (campaigns.length == 0) {
          return res.status(404).json({
            success: false,
            message: "campaigns not exist with this keyword",
          });
        }
      }
    } else {
      campaigns = await Campaign.find({});
    }
    return res.status(200).json({
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
export const getCampaignsByCategory = async (req, res) => {
  try {
    const keyword = req.body.category;
    let campaigns = "";
    if (keyword != "") {
      campaigns = await Campaign.find({ category: { $in: [keyword] } });
      if (!campaigns) {
        return res.status(404).json({
          success: false,
          message: "campaign does not exist for this category",
        });
      }
    } else {
      campaigns = await Campaign.find({});
    }
    return res.status(200).json({
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
export const getCampaignByType = async (req, res) => {
  try {
    const type = req.body.type;
    let campaigns;
    if (type == "All types") campaigns = await Campaign.find({});
    else if (type == "active")
      campaigns = await Campaign.find({ status: "active" });
    else if (type == "active")
      campaigns = await Campaign.find({ status: "active" });
    else if (type == "closed")
      campaigns = await Campaign.find({ status: "closed" });
    else if (type == "Most Raised") {
      campaigns = await Campaign.find().sort({ progress: -1 }).exec();
    } else if (type == "Newly Launched") {
      let currentDate = new Date();
      let oneMonthBfeoreDate = new Date(currentDate);
      oneMonthBfeoreDate.setMonth(oneMonthBfeoreDate.getMonth() - 1);
      campaigns = await Campaign.find({
        date: {
          $gte: oneMonthBfeoreDate,
          $lte: currentDate,
        },
      });
    }

    if (campaigns.length == 0)
      return res
        .status(404)
        .json({ success: false, message: "Campaigns not found" });

    return res.status(200).json({ success: false, message: "Campaigns found" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching Campaigns ",
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
    notification(
      req.user.id,
      "Your request is submitted for Campaign deletion"
    );
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
    const campiagn = await Campaign.findById(campaignid);
    const user = await UserProfile.findById({
      _id: "661e5367d79b469a29a53814",
    });
    const donationTime = user.donationhistory.filter(
      (data) => data.campaignID == campaignid
    );
    const currentTime = new Date();
    const campaginCreationTime = new Date(donationTime[0].time);
    let timedifference = Math.abs(campaginCreationTime - currentTime);
    timedifference = Math.abs(timedifference / (1000 * 60 * 60));
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
      notification(
        req.user.id,
        `Donated amount refunded for ${campiagn.name} Campaign `
      );
      return res.status(200).json({
        success: true,
        message: "refund accepted you wil get your amount in 5 to 7 days ",
      });
    } else {
      notification(req.user.id, "Time exceeded you cannot ask for refund now");
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
  try {
    const campaign = await Campaign.findById(req.body.id);

    if (req.body.reply == "yes") {
      const donors = campaign.donors;
      donors.map(async (id) => {
        const user = await UserProfile.findById(id);
        let donationhistory = user.donationhistory;
        donationhistory.map(async (data) => {
          if (data.campaignID === req.body.id) {
            let instance = new Razorpay({
              key_id: process.env.RAZORPAY_API_KEY,
              key_secret: process.env.RAZORPAY_API_KEY_SECRET,
            });
            const payment = await instance.payments.fetch(data.paymentID);
            await instance.payments.refund(data.paymentID, {
              amount: payment.amount,
              speed: "normal",
              notes: {
                notes_key_1: "Beam me up Scotty.",
                notes_key_2: "Engage",
              },
              receipt: "Receipt No. 31",
            });
          }
        });
        donationhistory = donationhistory.filter(
          (data) => data.campaignID != req.body.id
        );
        await UserProfile.findByIdAndUpdate(
          { id },
          { donationhistory: donationhistory },
          { new: true }
        );
      });
      await Campaign.findByIdAndDelete(req.body.id);
      notification(
        campaign.creator,
        `Your request for ${campaign.name} campgin deletion accepted`
      );
      return res
        .status(200)
        .json({ success: true, message: "camapgin deleted successfully" });
    } else {
      notification(
        campaign.creator,
        `Your request for ${campaign.name} campgin deletion rejected`
      );
      return res.status(200).json({
        success: true,
        message: "requset for campgin deletion rejected",
      });
    }
  } catch (error) {
    return req.status(500).json({
      success: false,
      message: "error while deleting the campaign in server",
    });
  }

  // reason why the admin should not accept the request
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
        amount: campaign.progress,
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
      notification(
        campaign.creator,
        `Fund transfered to bank account for ${campaign.name}`
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

export const getDonationInshightsData = async (req, res) => {
  try {
    const campaignID = req.body.id;
    const campaign = await Campaign.findById(campaignID);

    if (!campaign)
      return res
        .status(404)
        .json({ success: false, message: "campaign not found" });
    //calculate average
    const totalDonor = campaign.donors.length;
    const campaignFunds = campaign.progress;
    const average = totalDonor / Number(campaignFunds);

    // find donor list
    const donors = campaign.donors;
    const donorsData = [{ name: "", location: "", amountFunded: "" }];

    const promise = donors.map(async (id, index) => {
      let user = await UserProfile.findById(id);

      let donatioHisotry = user.donationhistory;

      let campagin = donatioHisotry.filter(
        (data) => data.campaignID == campaignID
      );
      let paymentID = campagin.paymentID;
      let instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_API_KEY_SECRET,
      });
      const payment = await instance.payments.fetch(paymentID);
      donorsData.push({
        name: user?.name,
        location: user?.location,
        amountFunded: payment.amount,
      });
    });
    await Promise.all(promise);

    // caluclate conversion list

    const visitors = campaign.visitors;
    const conversionData = (Number(visitors) / Number(totalDonor)) * 100;

    // comments

    const comments = campaign.comments;

    // goal completion chances till deadline

    const startingDate = new Date(campaign.date);
    const deadline = new Date(campaign.deadline);

    const difference = deadline - startingDate;
    const days = difference / (1000 * 60 * 60 * 24);
    const goal = Number(campaign.goal);

    const estimateAmount = average * days;
    const esitmateChance = (estimateAmount / goal) * 100;

    // performance among other campaigns

    const allCampaigns = await Campaign.find({});
    let performance = 0;
    const allCampaignsPromise = allCampaigns.map(async (data) => {
      const visitors = data.visitors;
      const donorsList = data.donors;
      const conversionDatathis = (visitors / donorsList) * 100;
      if (conversionDatathis < conversionData) performance++;
    });

    const campaignPerformance =
      (Number(performance) / Number(allCampaigns.length)) * 100;

    Promise.all(allCampaignsPromise);

    return res.status(200).json({
      success: true,
      message: "data found",
      average,
      donorsData,
      conversionData,
      comments,
      esitmateChance,
      campaignPerformance,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "failed to get the data" });
  }
};
