const router = require('express').Router();
const isLoggedIn = require('../middleware/auth.js');
require("dotenv").config();
const { WalletModel } = require("../Models/WalletsModel");
const Razorpay = require('razorpay');
const crypto = require("crypto");  
const {updateWallet} = require("./walletHelper");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// create order
router.post("/create-order", async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_" + Date.now()
    }

    try {
        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (err) {
        res.status(500).send(err);
    }

});
 // verify-payment
router.post("/verify-payment", isLoggedIn, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;
    const user = req.user;
    // 1. Signature banao
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    // 2. Compare karo
    if (expectedSignature === razorpay_signature) {
        res.json({ success: true, message: "Payment Verified ✅" });
    } else {
        res.status(400).json({ success: false, message: "Invalid Payment ❌" });
    }

   //update wallet
    const wallet = await WalletModel.findOneAndUpdate({userId:user._id}, {$inc:{balance:amount, totalAdded:amount}});
    console.log(wallet);

    // transaction
     await updateWallet(user, "CREDIT", amount,  "Funds Added via Razorpay");
}); 

module.exports= router;
