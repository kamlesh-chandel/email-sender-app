import express from "express";
import { sendEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.route("/sendEmail").post(sendEmail);

export default router;