import { Router } from "express";
import { adminregister, registerUser } from "../controllers/auth.controller.js";
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
import { requestDeleteCampaign } from "../controllers/campaign.controller.js";
import { listOfCampaignsToBeDeleted } from "../controllers/campaign.controller.js";
import { toAcceptCampaignDeletionByAdmin } from "../controllers/campaign.controller.js";
import { askForRefund } from "../controllers/campaign.controller.js";
import { adminregister } from "../controllers/auth.controller.js";
import { ownerShip } from "../controllers/owner.controller.js";
import { adminLogin } from "../controllers/auth.controller.js";
import { ownerLogin } from "../controllers/owner.controller.js";
const router = Router();
// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").put(authenticationMiddleware, changePassword);
router.route("/delete-account").delete(authenticationMiddleware, deleteAccount);
router.route("/admin-register").post(adminregister);
router.route("/admin-login").post(adminLogin);
router.route("/owner-register").post(ownerShip);
router.route("/owner-login").post(ownerLogin);
// campaign routes
router
  .route("/campaign-creation")
  .post(authenticationMiddleware, createCampaign);
router.route("/get-campaign").get(authenticationMiddleware, getCampaigns);
router.route("/update-campaign").post(authenticationMiddleware, updateCampaign);
router
  .route("/request-delete-campiagn")
  .post(authenticationMiddleware, requestDeleteCampaign);
router.route("/ask-for-refund").post(authenticationMiddleware, askForRefund);
router.route("/campaign-list-for-deletion").get(listOfCampaignsToBeDeleted);
router
  .route("/accept-campaign-deletion")
  .delete(toAcceptCampaignDeletionByAdmin);
// payment routes
router.route("/create-order").post(authenticationMiddleware, orderCreation);
router.route("/get-payment-key").get(authenticationMiddleware, getPaymentKey);
router
  .route("/payment-verification/:id/:campaignID")
  .post(authenticationMiddleware, paymentVerification);

// special route to for a owner
router.route("/bceome-owner").post(ownerShip);
router.route("/appoint-admins").post(appointAdmin);
export default router;
