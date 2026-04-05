const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ["CREDIT", "DEBIT"] },
  amount: { type: Number, required: true },
  description: { type: String },  
  createdAt: { type: Date, default: Date.now }
});

module.exports = {TransactionSchema};