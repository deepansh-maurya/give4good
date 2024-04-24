import { Router } from "express";
import {
  adminregister,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller.js";
import {
  createCampaign,
  kycOfBeneficiery,
} from "../controllers/campaign.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { getCampaigns } from "../controllers/campaign.controller.js";
import { updateCampaign } from "../controllers/campaign.controller.js";
import {
  orderCreation,
  paymentVerificationForRefund,
} from "../controllers/payment.controller.js";
import { getPaymentKey } from "../controllers/payment.controller.js";
import { paymentVerification } from "../controllers/payment.controller.js";
import { authenticationMiddleware } from "../middlwares/auth.middleware.js";
import { changePassword } from "../controllers/auth.controller.js";
import { deleteAccount } from "../controllers/auth.controller.js";
import { requestDeleteCampaign } from "../controllers/campaign.controller.js";
import { listOfCampaignsToBeDeleted } from "../controllers/campaign.controller.js";
import { toAcceptCampaignDeletionByAdmin } from "../controllers/campaign.controller.js";
import { askForRefund } from "../controllers/campaign.controller.js";
import {
  forVerifiactionCode,
  ownerShip,
} from "../controllers/owner.controller.js";
import { appointAdmin } from "../controllers/owner.controller.js";
import {
  acceptOrRejectGoods,
  donateGoods,
  listGoods,
  listRequestedGoods,
  listRequests,
  requestGoods,
  shipTheGoods,
  trackOrder,
} from "../controllers/goods.controller.js";
const router = Router();
// auth routes
router.route("/register").post(registerUser); //
router.route("/login").post(loginUser); //
router.route("/change-password").put(authenticationMiddleware, changePassword);
router.route("/get-verification-code").post(forVerifiactionCode);
router.route("/forget-pasword").post(authenticationMiddleware, resetPassword);
router.route("/delete-account").delete(authenticationMiddleware, deleteAccount);
router.route("/admin-register").get(adminregister);
// profile routes
router.route("/user-profile").get(authenticationMiddleware, userProfile);
// router.route("/form-submit").post(handleSubmitForm);
router.route("/owner-register").post(ownerShip);
// campaign routes
router.route("/kyc-verification").post(kycOfBeneficiery);
router.route("/campaign-creation").post(createCampaign);
router.route("/get-campaign").post(getCampaigns);
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
router.route("/create-order").post(orderCreation);
router.route("/get-payment-key").get(getPaymentKey);
router.route("/payment-verification/:id/:campaignID").post(paymentVerification);
router
  .route("payment-verifiaction-for-refund")
  .post(authenticationMiddleware, paymentVerificationForRefund);
// special route to for a owner
router.route("/appoint-admins").post(appointAdmin);
// route to donate the goods
router.route("/donate-goods").post(authenticationMiddleware, donateGoods);
router.route("list-goods").post(authenticationMiddleware, listGoods);
router.route("request-goods").post(authenticationMiddleware, requestGoods);
router.route("list-requests").post(authenticationMiddleware, listRequests);
router
  .route("accept-or-reject-request")
  .post(authenticationMiddleware, acceptOrRejectGoods);
router.route("to-ship-the-goods").post(authenticationMiddleware, shipTheGoods);
router.route("track-order").post(authenticationMiddleware, trackOrder);
router
  .route("list-requested-good")
  .get(authenticationMiddleware, listRequestedGoods);
export default router;
