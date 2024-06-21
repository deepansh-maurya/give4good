import { Router } from "express";
import {
  adminregister,
  checkauthstatus,
  getProfile,
  isCampaignActive,
  registerUser,
  resetPassword,
  updateDocument,
  updateProfile,
  updateProfilePicture,
  userProfile,
} from "../controllers/auth.controller.js";
import {
  commentHandler,
  createCampaign,
  getCampaignByType,
  getCampaignsByCategory,
  getCampaignsByTagAndSearch,
  getDonationInshightsData,
  handleReport,
  isDonatedOrNot,
  kycOfBeneficiery,
} from "../controllers/campaign.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
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
  fetchProfile,
  getRequestedStatus,
  getRequesters,
  listGoodByType,
  listGoods,
  listGoodsBySeacrhAndTags,
  listRequestedGoods,
  listRequests,
  requestGoods,
  shipTheGoods,
  trackOrder,
} from "../controllers/goods.controller.js";
import { upload } from "../middlwares/multer.middleware.js";
const router = Router();
// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").put(authenticationMiddleware, changePassword);
router
  .route("/get-verification-code")
  .get(authenticationMiddleware, forVerifiactionCode);
router.route("/forget-pasword").post(authenticationMiddleware, resetPassword);
router.route("/delete-account").delete(authenticationMiddleware, deleteAccount);
router.route("/admin-register").get(adminregister);
router
  .route("/check-auth-status")
  .get(authenticationMiddleware, checkauthstatus);
// profile routes
router.route("/fetch-profile").get(authenticationMiddleware, fetchProfile);
router.route("/user-profile").get(authenticationMiddleware, userProfile);
router.route("/update-profile").post(authenticationMiddleware, updateProfile);
router
  .route("/update-document")
  .post(authenticationMiddleware, upload.single("document"), updateDocument);
router
  .route("/update-profile-picture")
  .post(
    authenticationMiddleware,
    upload.single("profilePicture"),
    updateProfilePicture
  );
// router.route("/form-submit").post(handleSubmitForm);
router.route("/owner-register").post(ownerShip);
// campaign routes
router
  .route("/is-campaign-active")
  .get(authenticationMiddleware, isCampaignActive);
router.route("/is-donated").post(authenticationMiddleware, isDonatedOrNot);
router
  .route("/kyc-verification")
  .post(authenticationMiddleware, upload.single("document"), kycOfBeneficiery);
router.route("/campaign-creation/:id").post(
  authenticationMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createCampaign
);
router
  .route("/handle-report-to-campaign")
  .post(authenticationMiddleware, handleReport);
router
  .route("/add-comment-on-campaign")
  .post(authenticationMiddleware, commentHandler);
router
  .route("/get-campaign-by-tag-search")
  .post(authenticationMiddleware, getCampaignsByTagAndSearch);
router
  .route("/get-campaignbycategory")
  .post(authenticationMiddleware, getCampaignsByCategory);
router
  .route("/get-campaign-by-type")
  .post(authenticationMiddleware, getCampaignByType);

router.route("/update-campaign").post(authenticationMiddleware, updateCampaign);
router
  .route("/request-delete-campiagn")
  .post(authenticationMiddleware, requestDeleteCampaign);
router.route("/ask-for-refund").post(authenticationMiddleware, askForRefund);
router
  .route("/campaign-donation-insights")
  .get(authenticationMiddleware, getDonationInshightsData);
// admin routes
router.route("/campaign-list-for-deletion").get(listOfCampaignsToBeDeleted);
router
  .route("/accept-campaign-deletion")
  .delete(toAcceptCampaignDeletionByAdmin);
// payment routes
router.route("/create-order").post(authenticationMiddleware, orderCreation);
router.route("/get-payment-key").get(authenticationMiddleware, getPaymentKey);
router
  .route("/payment-verification/:id/:campaignID/:token")
  .post(authenticationMiddleware, paymentVerification);
router
  .route("payment-verifiaction-for-refund")
  .post(authenticationMiddleware, paymentVerificationForRefund);
// special route to for a owner
router.route("/appoint-admins").post(appointAdmin);
// route for goods
router.route("/donate-goods").post(
  authenticationMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  donateGoods
);
router.route("/fetch-profile").post(authenticationMiddleware, fetchProfile);
router.route("/list-goods").post(authenticationMiddleware, listGoods);
router
  .route("/list-goods-seacrh-tags")
  .post(authenticationMiddleware, listGoodsBySeacrhAndTags);
router
  .route("/list-goods-by-type")
  .post(authenticationMiddleware, listGoodByType);
router.route("/request-goods").post(
  authenticationMiddleware,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  requestGoods
);
router.route("/list-requests").post(authenticationMiddleware, listRequests);
router
  .route("/accept-or-reject-request")
  .post(authenticationMiddleware, acceptOrRejectGoods);
router.route("/to-ship-the-goods").post(authenticationMiddleware, shipTheGoods);
router.route("/track-order").post(authenticationMiddleware, trackOrder);
router
  .route("/get-requestd-status")
  .post(authenticationMiddleware, getRequestedStatus);
router
  .route("/list-requested-good")
  .get(authenticationMiddleware, listRequestedGoods);
router.route("/get-requesters").post(authenticationMiddleware, getRequesters);
//special routes
router.route("/get-profile").post(authenticationMiddleware, getProfile);
export default router;
