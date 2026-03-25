const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const HoldingsSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, index: true },
    qty: Number,
    avg: Number,
    price: Number,
    net: Number,
    day: Number,
});

module.exports = { HoldingsSchema };