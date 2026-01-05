const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: Number,
    day: Number,
});

module.exports = { HoldingsSchema };