import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import crypto from "crypto";
import { razorpay } from "../server.js";
import Payment from "../models/payment.model.js";

export const getRazorpayApiKey = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Razorpay API Key",
    key: process.env.RAZORPAY_KEY_ID,
  });
};

export const buySubscription = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(new AppError("UnAuthorized, Please Login", 500));
    }
    const { id } = req.user;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("UnAuthorized, Please Login", 500));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot purchase a subscription", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID, // plan ID of the product to be purchased
      customer_notify: 1,
      total_count: 1,
    });

    console.log("Subscription response:", subscription);

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Course Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError(error.message, 500));
  }
};

export const verifySubscription = async (req, res, next) => {
  try {
    const id = req.user.id;
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_subscription_id,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("UnAuthorized, please login", 400));
    }

    const subscriptionId = user.subscription.id;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    console.log(razorpay_signature);
    console.log(generatedSignature);
    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not Verified, please try again", 400));
    }

    // Enum for subscription statuses
    const SubscriptionStatus = {
      ACTIVE: "active",
      INACTIVE: "inactive",
      CANCELED: "canceled",
    };

    await Payment.create({
      razorpay_payment_id,
      razorpay_signature: generatedSignature,
      razorpay_subscription_id,
      status: SubscriptionStatus.ACTIVE,
      timestamp: new Date(),
    });

    user.subscription.status = SubscriptionStatus.ACTIVE;
    console.log(user.subscription.status);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified Successfully",
      user
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("UnAuthorized, Please Login", 500));
    }

    if (user.role === "ADMIN") {
      return next(
        new AppError("Admin can not purchase or Cancel a subscription", 400)
      );
    }

    const subscriptionID = user.subscription.id;

    const subscription = razorpay.subscriptions.cancel({
      subscriptionID,
    });

    user.subscription.status = subscription.status;
    await user.save();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const allPayments = async (req, res, next) => {
  try {
    const { count } = req.query;

    const subscription = await razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All Payments",
      subscription,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
