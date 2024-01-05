
import cloudinary from "cloudinary";
import app from "./app.js";
import connectToDb from "./config/dbConn.js";
import Razorpay from "razorpay";

const PORT = process.env.PORT || 5000;


//cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


//razorpay setup
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async (req, res) => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDb();
});
