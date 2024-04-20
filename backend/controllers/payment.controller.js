import Razorpay from "razorpay";
import { UserProfile } from "../models/userProfile.models.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { Campaign } from "../models/campaign.models.js";
export const orderCreation = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_KEY_SECRET,
    });

    var options = {
      amount: Number(req.body.details.amount),
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);
    // console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal error",
      error,
    });
  }
};
export const getPaymentKey = async (req, res) => {
  try {
    const key = process.env.RAZORPAY_API_KEY;
    return res.status(200).json({
      success: true,
      key,
    });
  } catch (error) {}
};
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const response = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      process.env.RAZORPAY_API_KEY_SECRET
    );
    if (!response) {
      res.status(400).json({
        success: true,
        messgae: "payment donation failed",
      });
    }
    const data = {
      paymentID: razorpay_payment_id,
      orderID: razorpay_order_id,
      signature: razorpay_signature,
      campaignID: req.params.campaignID,
      time: new Date(),
    };
    const user = await UserProfile.findById({ _id: req.params.id });
    const donationhistory = user.donationhistory;
    donationhistory.push(data);
    const updatedUser = await UserProfile.updateOne(
      { _id: req.params.id },
      { donationhistory },
      { new: true }
    );
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_KEY_SECRET,
    });
    const payment = await instance.payments.fetch(razorpay_payment_id);

    const campaign = await Campaign.findById({ _id: req.params.campaignID });

    const donorArray = campaign.donors;
    donorArray.push(req.user.id);

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      {
        _id: req.params.campaignID,
      },
      { progress: campaign.goal + payment.amount / 100, donors: donorArray },
      { new: true }
    );
    if (updatedCampaign.progress >= updatedCampaign.deadline) {
      const progress = await Campaign.findByIdAndUpdate(
        { _id: req.params.campaignID },
        { status: "inactive" },
        { new: true }
      );
      if (!progress) {
        return res.status(400).json({
          success: true,
          messgae: "payment donation failed, payment refunded",
        });
      }
    }
    console.log(req.params.campaignID);
    if (!updatedUser || !updatedCampaign) {
      //refund
      return res.status(400).json({
        success: true,
        messgae: "payment donation failed, payment refunded",
      });
    }
    return res.status(200).json({
      success: true,
      messgae: "payment donation successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal error while payment",
    });
  }
};
export const paymentVerificationForRefund = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;
    const response = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      process.env.RAZORPAY_API_KEY_SECRET
    );
    if (!response) {
      res.status(400).json({
        success: true,
        messgae: "payment donation failed",
      });
    }
    const data = {
      paymentID: razorpay_payment_id,
      orderID: razorpay_order_id,
      signature: razorpay_signature,
      campaignID: req.params.campaignID,
    };
    const user = await UserProfile.findById({ _id: req.params.id });
    const refundhistory = user.refundhistory;
    refundhistory.push(data);
    const updatedUser = await UserProfile.updateOne(
      { _id: req.params.id },
      { refundhistory },
      { new: true }
    );

    if (!updatedUser) {
      //refund
      res.status(400).json({
        success: true,
        messgae: "refund  failed, payment refunded",
      });
    }
    return res.status(200).json({
      success: true,
      messgae: "payment refund successfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal error while refund",
    });
  }
};

// handle refund
