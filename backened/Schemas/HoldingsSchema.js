const { Schema } = require("mongoose");

const HoldingsSchema = new Schema({
    name: {type: String, index:true},
    qty: Number,
    avg: Number,
    price: Number,
    net: Number,
    day: Number,
});

module.exports = { HoldingsSchema };