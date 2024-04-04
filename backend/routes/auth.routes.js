import { Router } from "express";
const router = Router();
import { registerUser } from "../controllers/auth.controller.js";
import { createCampaign } from "../controllers/campaign.controller.js";
import { loginUser } from "../controllers/auth.controller.js";
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/campaign-creation").post(createCampaign);
export default router;
