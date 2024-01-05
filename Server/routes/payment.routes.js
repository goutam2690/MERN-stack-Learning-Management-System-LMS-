import { Router } from "express";
import { allPayments, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import {authorizedRoles, isAuthenticated} from '../middlewares/auth.js'

const router = Router();

router.route("/razorpay-key").get(isAuthenticated, getRazorpayApiKey);
router.route("/subscribe").post(isAuthenticated, buySubscription);
router.route("/verify").post(isAuthenticated, verifySubscription);
router.route("/unsubscribe").post(isAuthenticated, cancelSubscription);
router.route("/").get(isAuthenticated, authorizedRoles('ADMIN'), allPayments);

export default router;