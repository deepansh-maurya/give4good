import { Router } from "express";
const router = Router();
import { registerUser } from "../controllers/auth.controller.js";
import { createCampaign } from "../controllers/campaign.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { getCampaigns } from "../controllers/campaign.controller.js";
import { updateCampaign } from "../controllers/campaign.controller.js";
import { orderCreation } from "../controllers/payment.controller.js";
import { getPaymentKey } from "../controllers/payment.controller.js";
import { paymentVerification } from "../controllers/payment.controller.js";
// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// campaign routes
router.route("/campaign-creation").post(createCampaign);
router.route("/get-campaign").get(getCampaigns);
router.route("/update-campaign").post(updateCampaign);
// payment routes
router.route("/create-order").post(orderCreation);
router.route("/get-payment-key").get(getPaymentKey);
router.route("/payment-verification/:id/:campaignID").post(paymentVerification);
export default router;
