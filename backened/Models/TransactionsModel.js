const { model } = require("mongoose");
const {TransactionSchema}  = require("../Schemas/TransactionsSchema");

const TransactionModel =  model("Transaction", TransactionSchema);

module.exports = { TransactionModel };
