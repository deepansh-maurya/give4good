import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { createCampaign } from "../controllers/campaign.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { getCampaigns } from "../controllers/campaign.controller.js";
import { updateCampaign } from "../controllers/campaign.controller.js";
import { orderCreation } from "../controllers/payment.controller.js";
import { getPaymentKey } from "../controllers/payment.controller.js";
import { paymentVerification } from "../controllers/payment.controller.js";
import { authenticationMiddleware } from "../middlwares/auth.middleware.js";
import { changePassword } from "../controllers/auth.controller.js";
import { deleteAccount } from "../controllers/auth.controller.js";
const router = Router();
// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").put(authenticationMiddleware, changePassword);
router.route("/delete-account").delete(authenticationMiddleware, deleteAccount);
// campaign routes
router
  .route("/campaign-creation")
  .post(authenticationMiddleware, createCampaign);
router.route("/get-campaign").get(authenticationMiddleware, getCampaigns);
router.route("/update-campaign").post(authenticationMiddleware, updateCampaign);
// payment routes
router.route("/create-order").post(authenticationMiddleware, orderCreation);
router.route("/get-payment-key").get(authenticationMiddleware, getPaymentKey);
router
  .route("/payment-verification/:id/:campaignID")
  .post(authenticationMiddleware, paymentVerification);
export default router;
