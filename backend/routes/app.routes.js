import { Router } from "express";
const router = Router();
import { registerUser } from "../controllers/auth.controller.js";
import { createCampaign } from "../controllers/campaign.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
import { getCampaigns } from "../controllers/campaign.controller.js";
import { updateCampaign } from "../controllers/campaign.controller.js";
// auth routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// campaign routes
router.route("/campaign-creation").post(createCampaign);
router.route("/get-campaign").get(getCampaigns);
router.route("/update-campaign").post(updateCampaign);
export default router;
