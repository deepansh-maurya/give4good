import { Goods } from "../models/goods.models.js";
import axios from "axios";
import { token } from "../constants.js";
import { UserProfile } from "../models/userProfile.models.js";
import { Shippedgood } from "../models/shippedGoods.model.js";
import { upoadFile } from "../utils/cloudinary.js";
import mongoose from "mongoose";
import { request } from "express";

let expiryOfToken;
// routes to add goods to donate
export const donateGoods = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      description,
      boughtdate,
      expirydate,
      brand,
      tags,
      weight,
      dimensions,
      city,
      condition,
      quantity,
      category,
      resaonOfDonation,
    } = req.body;

    if (
      name == "" &&
      description == "" &&
      boughtdate == "" &&
      expirydate == "" &&
      city == "" &&
      condition == "" &&
      quantity == "" &&
      category == "" &&
      resaonOfDonation == ""
    ) {
      return res.status(400).json({
        success: false,
        message: "wrong credentials",
      });
    }
    console.log(
      2,
      req.files.video,
      Array.isArray(req.files.video),
      req.files.video.length > 0
    );
    console.log(
      1,
      req.files.image,
      Array.isArray(req.files.image),
      req.files.image.length > 0
    );
    if (
      !req.files ||
      !Array.isArray(req.files.image) ||
      !req.files.image.length > 0
    )
      return res
        .status(400)
        .json({ succes: false, message: "ALl feilds required" });
    if (
      !req.files ||
      !Array.isArray(req.files.video) ||
      !req.files.video.length > 0
    )
      return res
        .status(400)
        .json({ succes: false, message: "ALl feilds required" });
    const imagePath = req.files?.image[0]?.path;
    const videoPath = req.files?.video[0]?.path;
    console.log(imagePath, videoPath);

    const image = await upoadFile(imagePath);
    const video = await upoadFile(videoPath);

    const goods = await Goods.create({
      donor: req.user._id,
      name,
      description,
      boughtdate,
      expirydate,
      status: "available",
      condition,
      quantity,
      brand: brand || "",
      tags: tags || "",
      weight: weight || "",
      dimensions: dimensions || "",
      city,
      image,
      video,
      category,
      resaonOfDonation,
    });

    const user = await UserProfile.findById(req.user.id);
    let donatedGood = user.donatedGood || [];
    donatedGood.push(goods._id);
    await UserProfile.findByIdAndUpdate(req.user.id, {
      donatedGood: donatedGood,
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const listGoodsBySeacrhAndTags = async (req, res) => {
  try {
    let keyword = req.body.keyword;

    let goods;
    if (!keyword) {
      goods = await Goods.find({});
      if (!goods) {
        return res.status(404).json({
          success: false,
          messagae: "goods not found",
        });
      }
      return res
        .status(200)
        .json({ success: true, message: "goods found", goods });
    }
    goods = await Goods.find({ name: { $regex: keyword, $options: "i" } });

    if (!goods) {
      goods = await Goods.find({ tags: { $in: [keyword] } });
      if (!goods) {
        return res.status(404).json({
          success: false,
          messagae: "goods not found",
        });
      }
    }
    return res.status(200).json({
      success: true,
      messagae: "goods  found",
      goods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messagae: "goods not found, internal error",
    });
  }
};

export const listGoods = async (req, res) => {
  try {
    console.log(req.body.location, "location");
    if (req.body.city) {
      let goods = await Goods.find({ city: req.body.city });
      if (!goods)
        return res
          .status(404)
          .json({ success: false, message: "goods not found" });

      return res
        .status(200)
        .json({ success: true, message: "goods found", goods });
    } else if (req.body.city == "") {
      let goods = await Goods.find({});
      if (!goods)
        return res
          .status(404)
          .json({ success: false, message: "goods not found" });

      return res
        .status(200)
        .json({ success: true, message: "goods found", goods });
    }
    const category = req.body.category;
    console.log(category);
    let goods;
    if (category != "") {
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
      success: true,
      message: "goods fetched successfully",
      goods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: " internal error while goods fetching",
    });
  }
};

export const fetchProfile = async (req, res) => {
  try {
    console.log(req.body, "kya");
    const user = await UserProfile.findById(
      new mongoose.Types.ObjectId(req.body.id)
    );
    if (!user)
      return res.status(404).json({ success: false, message: "not found" });
    return res.status(200).json({ success: true, message: "user found", user });
  } catch (error) {
    return res.status(404).json({ success: false, message: "not found" });
  }
};
// routes for needy to get the goods

export const requestGoods = async (req, res) => {
  try {
    console.log(new mongoose.Types.ObjectId(req.body.donorID));
    const donor = await UserProfile.findById(
      new mongoose.Types.ObjectId(req.body.donorID)
    );
    console.log(req.files);
    let imagePath;
    let videoPAth;
    if (
      req.files &&
      Array.isArray(req.files.image) &&
      req.files.image.length > 0
    ) {
      imagePath = req.files.image[0].path;
      imagePath = await upoadFile(imagePath);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "atleast relevent photo required " });
    }
    if (
      req.files &&
      Array.isArray(req.files.video) &&
      req.files.video.length > 0
    ) {
      videoPAth = req.files.video[0].path;
      videoPAth = await upoadFile(videoPAth);
    }
    let good = donor.donatedGood;
    let requests = good.filter((data) => {
      if (data._id == req.body.goodid) return data;
    });
    requests[0].requests.push({
      id: req.user._id,
      proposel: req.body.proposel,
      image: imagePath,
      video: videoPAth,
      contact: req.body.contact,
    });
    const updatedDonor = await UserProfile.findByIdAndUpdate(
      { _id: req.body.donorID },
      { donatedGood: good },
      { new: true }
    );

    const requester = await UserProfile.findById(req.user._id);
    const requestedGood = requester.requestedgood;
    requestedGood.push({ id: new mongoose.Types.ObjectId(req.body.goodid) });

    const updatedRequester = await UserProfile.findByIdAndUpdate(
      req.user._id,
      {
        requestedgood: requestedGood,
      },
      { new: true }
    );

    if (!updatedDonor || !updatedRequester) {
      return res.status(400).json({
        success: false,
        message: "request failed try again",
      });
    }
    return res.status(200).json({
      success: true,
      message: "request submitted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: " internal error while requesting",
    });
  }
};
export const listRequests = async (req, res) => {
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
export const acceptOrRejectGoods = async (req, res) => {
  try {
    const status = req.body.status;
    const donor = await UserProfile.findById(req.body.donor);
    const donatedGood = donor.donatedGood;
    donatedGood.filter((data) => {
      if (data._id == req.body.goodid) {
        data.requests.filter((data) => {
          if (data.id == req.body.requestid) {
            data.status = status;
          }
        });
      }
    });
    donatedGood.filter((data) => {
      if (data._id == req.body.goodid) {
        data.requests.filter((data) => {
          if (data.id == req.body.requestid) {
            console.log(data);
          }
        });
      }
    });
    const updatedDonor = await UserProfile.findByIdAndUpdate(
      {
        _id: req.body.donor,
      },
      { donatedGood: donatedGood },
      { new: true }
    );

    const requester = await UserProfile.findById(req.body.requestid);
    const requestedGood = requester.requestedgood;
    requestedGood.filter((data) => {
      if (data.id.toString() == req.body.goodid.toString()) {
        data.status = status;
        data.contact = donor?.contact || "7845787843";
      }
    });
    requestedGood.filter((data) => {
      if (data.id.toString() == req.body.goodid.toString()) {
        console.log(data);
      }
    });
    const updatedRequester = await UserProfile.findByIdAndUpdate(
      req.body.requestid,
      {
        requestedgood: requestedGood,
      },
      { new: true }
    );

    if (!updatedDonor) {
      return res.status(400).json({
        success: false,
        message: "failed to accept or reject",
      });
    }

    if (!updatedRequester) {
      return res
        .status(400)
        .json({ success: false, message: "failed to accept or reject " });
    }
    return res.status(200).json({
      success: true,
      message: " decision taken successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "internal error (failed to accept or reject)",
    });
  }
};
const generateTokenForShiprocketApis = async () => {
  let data = JSON.stringify({
    email: "deepanshmaurya135@gmail.com",
    password: "deepansh123*",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://apiv2.shiprocket.in/v1/external/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
function generateSKU() {
  // Generate a random alphanumeric string
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let sku = "";
  for (let i = 0; i < 8; i++) {
    sku += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return sku;
}
export const shipTheGoods = async (req, res) => {
  try {
    // creating order
    let data = JSON.stringify({
      order_id: "224-447",
      order_date: req.body.date,
      pickup_location: "Primary",
      channel_id: "",
      comment: "Reseller: M/s Goku",
      billing_customer_name: req.body.name,
      billing_last_name: req.body.lname,
      billing_address: req.body.address,
      billing_address_2: req.body.name || "",
      billing_city: req.body.city,
      billing_pincode: req.body.pincode,
      billing_state: req.body.state,
      billing_country: req.body.country,
      billing_email: req.body.email,
      billing_phone: req.body.number,
      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",
      order_items: [
        {
          name: req.body.prod_name,
          sku: generateSKU(),
          units: req.body.prod_unit,
          selling_price: req.body.pro_price,
        },
      ],
      payment_method: "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: req.body.prod_unit * req.body.pro_price,
      length: req.body.prod_length,
      breadth: req.body.prod_breadth,
      height: req.body.prod_height,
      weight: req.body.prod_weight,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(async function (response) {
        let shippedgood = await Shippedgood.create({
          order_id: response.order_id,
          channel_order_id: response.channel_order_id,
          shipment_id: response.shipment_id,
        });
        if (shippedgood) {
          // check available courier
          let avialability = await axios({
            method: "get",
            maxBodyLength: Infinity,
            url: "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          let courier = avialability.data.available_courier_companies;

          // generate awb
          let data = JSON.stringify({
            shipment_id: shippedgood.shipment_id,
            courier_id: courier[Math.floor(Math.random() * courier.length - 1)],
          });

          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: data,
          };

          let awb = await axios(config);

          if (awb) {
            let updatedShippedData = await Shippedgood.findByIdAndUpdate(
              { _id: shippedgood._id },
              { awn_data: awb.data, shipped_by: awb.shipped_by },
              { new: true }
            );

            if (updatedShippedData) {
              let shipRequest = await axios({
                method: "post",
                maxBodyLength: Infinity,
                url: "https://apiv2.shiprocket.in/v1/external/courier/generate/pickup",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                  shipment_id: shippedgood.shipment_id,
                }),
              });

              if (shipRequest) {
                let updatedShippedData = await Shippedgood.findByIdAndUpdate(
                  { _id: shippedgood._id },
                  {
                    shipped_response: shipRequest.response,
                  },
                  { new: true }
                );
                if (updatedShippedData) {
                  let user = await UserProfile.findById({ _id: req.user.id });
                  let shippedgooddetail = user.shippedgooddetail;
                  shippedgooddetail.push({
                    shippedinfo: updatedShippedData._id,
                    goodinfo: req.body.goodID,
                  });
                  let updatedUser = await UserProfile.findByIdAndUpdate(
                    { _id: req.user.id },
                    { shippedgooddetail: shippedgooddetail }
                  );
                  ///   changes remaaining for updating values
                  if (updatedUser) {
                    return res.status(200).json({
                      success: true,
                      message: "good shipped successfully",
                    });
                  } else {
                    return res.status(400).json({
                      success: true,
                      message: " error while shippping the good,try again",
                    });
                  }
                } else {
                  return res.status(400).json({
                    success: true,
                    message: " error while shippping the good,try again",
                  });
                }
              } else {
                return res.status(400).json({
                  success: true,
                  message: " error while shippping the good,try again",
                });
              }
            } else {
              return res.status(400).json({
                success: true,
                message: " error while shippping the good,try again",
              });
            }
          } else {
            return res.status(400).json({
              success: true,
              message: " error while shippping the good,try again",
            });
          }
        } else {
          return res.status(400).json({
            success: true,
            message: " error while shippping the good,try again",
          });
        }
      })
      .catch(function (error) {
        if (error.err_code) {
          token = generateTokenForShiprocketApis();
          shipTheGoods();
        }
      });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "internal error while shippping the good",
    });
  }
};
export const trackOrder = async (req, res) => {
  try {
    const goodID = req.body.goodID;
    const user = await UserProfile.findById({ _id: req.body.donorID });
    const shippedgooddetail = user.shippedgooddetail;
    const shippedinfo = shippedgooddetail.filter(
      (data) => data.goodinfo == goodID
    );
    const shippedID = shippedinfo.shippedinfo;
    const shippedData = await Shippedgood.findById({ _id: shippedID });

    const awb = shippedData.awn_data;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb.awb_code}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let response = await axios(config);

    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: "failed to track" });
    }
    return res
      .status(200)
      .json({ success: true, message: "tracking successfull", response });
  } catch (error) {}
};
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

export const getRequesters = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.body.id);
    const user = await UserProfile.findById(id);
    const dondationData = user.donatedGood;
    console.log(dondationData);
    const requestes = dondationData.filter(
      (data) => data._id == req.body.goodid
    );

    if (requestes.length == 0)
      return res.status(404).json({ success: false, message: "not found" });
    return res
      .status(404)
      .json({ success: true, message: "not found", requestes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "error while fetching data " });
  }
};

export const getRequestedStatus = async (req, res) => {
  try {
    let id = req.body.id;
    let user = await UserProfile.findById(req.user._id);
    let requestedGoodData = user.requestedgood;
    console.log(requestedGoodData);
    let status;
    requestedGoodData.map((data) => {
      if (data.id == id) {
        status = data.status;
      }
    });
    if (!status)
      return res.status(404).json({ successs: false, message: "not found" });
    return res.status(200).json({ successs: true, message: " found", status });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ successs: false, message: "internal error" });
  }
};
