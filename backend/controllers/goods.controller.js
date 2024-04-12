import { Goods } from "../models/goods.models.js";
import axios from "axios";
import { token } from "../constants.js";
import { UserProfile } from "../models/userProfile.models.js";
import { Shippedgood } from "../models/shippedGoods.model.js";

let expiryOfToken;
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
