const { model } = require("mongoose");

const { OrdersSchema} = require("../Schemas/OrdersSchema");

const OrdersModel = model("Orders", OrdersSchema);

module.exports = { OrdersModel };