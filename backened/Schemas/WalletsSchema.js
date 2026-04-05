const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    unique: true 
  },
  balance: { type: Number, default: 0 },
  totalAdded: { type: Number, default: 0 }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = {WalletSchema};