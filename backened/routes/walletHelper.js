const { WalletModel } = require("../Models/WalletsModel.js");
const { TransactionModel } = require('../Models/TransactionsModel.js');
// update transaction 
async function updateWallet(user, type, amount, description) {
    await WalletModel.findOneAndUpdate({ userId: user._id },
        {
            $inc: {
                balance: type === "CREDIT" ? amount : -amount,
                totalAdded: type === "CREDIT" ? amount : 0
            }
        });
    
         await TransactionModel.create({
           userId: user._id,
           type: type,
          amount: amount,
          description: description,
    })
}

module.exports = { updateWallet };