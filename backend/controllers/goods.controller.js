import { Goods } from "../models/goods.models.js";
import { UserProfile } from "../models/userProfile.models.js";

// routes to add goods to donate
export const donateGoods = async (req, res) => {
  try {
    const {
      donor,
      name,
      description,
      boughtdate,
      expirydate,
      status,
      condition,
      quantity,
      category,
    } = req.body;

    if (
      [
        donor,
        name,
        description,
        boughtdate,
        expirydate,
        status,
        condition,
        quantity,
        category,
      ].filter((data) => data == "")
    ) {
      return res.status(400).json({
        success: false,
        message: "wrong credentials",
      });
    }

    const goods = await Goods.create({
      donor,
      name,
      description,
      boughtdate,
      expirydate,
      status,
      condition,
      quantity,
      category,
    });

    if (!goods) {
      return res.status(400).json({
        success: false,
        message: "daonation failed,try again",
      });
    }
    return res.status(200).json({
      success: true,
      message: "goods donated",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "internal error",
    });
  }
};

export const listGoods = async (req, res) => {
  try {
    const category = req.body.category;
    let goods;
    if (category) {
      goods = await Goods.find({ category: category });
    } else {
      goods = await Goods.find({});
    }
    if (!goods) {
      return res.status(404).json({
        success: false,
        message: "goods not found",
      });
    }
    return res.status(200).json({
      succes: true,
      message: "goods fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      succes: true,
      message: " internal error while goods fetching",
    });
  }
};

// routes for needy to get the goods

export const requestGoods = async (req, res) => {
  try {
    const donor = await UserProfile.findById({ _id: req.body.donorID });
    const good = donor.donatedGood.map((data) => {
      if (data.id == req.body.goodid) {
        data.requests.push({
          id: req.body.requesterid,
          proposel: req.body.proposel,
          image: req.body.image,
          video: req.body.video,
        });
      }
    });

    const updatedDonor = await UserProfile.findByIdAndUpdate(
      { _id: req.body.donorID },
      { donatedGood: good },
      { new: true }
    );
    if (!updatedDonor) {
      return res.status(400).json({
        success: false,
        message: "request failed try again",
      });
    }
    return res.status(200).json({
      success: false,
      message: "request submitted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: " internal error while requesting",
    });
  }
};

export const listrequests = async (req, res) => {
  try {
    const donor = await UserProfile.findById({ _id: req.user.id });
    const goodid = req.body.goodid;
    const goods = donor.donatedGood.filter((data) => data.id == goodid);
    const requests = goods.requests;

    if (!requests) {
      return res.status(404).json({
        success: true,
        message: "no resquest found",
      });
    }
    return res.status(200).json({
      success: true,
      message: " resquests found",
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "internal error while requesting the error",
    });
  }
};

export const acceptorrejectgoods = async (req, res) => {
  try {
    const status = req.body.status;
    const donor = await UserProfile.findById({ _id: req.user.id });
    const donatedGood = donor.donatedGood.map((data) => {
      if (data.id == req.body.goodID) {
        data.requests.map((requestData) => {
          if (requestData.id == req.body.requestID) {
            requestData.status = status;
          }
        });
      }
    });
    const updatedDonor = await UserProfile.findByIdAndUpdate(
      {
        _id: req.user.id,
      },
      { donatedGood: donatedGood },
      { new: true }
    );

    if (!updatedDonor) {
      return res.status(400).json({
        success: false,
        message: "failed to accept or reject",
      });
    }
    const requester = await UserProfile.findById({ _id: req.body.requestID });
    const requestedgood = requester.requestedgood.map(
      (data) => (data.contact = donor.contact)
    );
    const updatedRequester = await UserProfile.findByIdAndUpdate(
      {
        _id: req.body.requestID,
      },
      { requestedgood: requestedgood }
    );

    if (!updatedRequester) {
      return res
        .status(400)
        .json({ success: false, message: "failed to accept or reject " });
    }
    return res.status(200).json({
      success: false,
      message: " decision taken successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal error (failed to accept or reject)",
    });
  }
};
// list requested goods

export const listRequestedGoods = async (req, res) => {
  try {
    const user = await UserProfile.findById({ _id: req.user?.id });
    const goods = user.requestedgood;
    if (!goods) {
      return res
        .status(404)
        .json({ success: false, message: "goods not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "goods found successfully", goods });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal error while searching for the goods",
    });
  }
};
// cancel request for goods
