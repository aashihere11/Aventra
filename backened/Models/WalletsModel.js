const { model } = require("mongoose");
const {WalletSchema}  = require("../Schemas/WalletsSchema");

const WalletModel =  model("Wallet", WalletSchema);

module.exports = { WalletModel };