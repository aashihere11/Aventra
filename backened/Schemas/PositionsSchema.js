const { Schema } = require("mongoose");
const mongoose = require("mongoose");


const PositionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: String,
        enum: ["CNC", "MIS"], // Delivery / Intraday
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    avg: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

}, { timestamps: true });

module.exports = { PositionsSchema };