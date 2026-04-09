const router = require('express').Router();
const { TransactionModel } = require('../Models/TransactionsModel.js');
const isLoggedIn = require('../middleware/auth.js');

router.get("/transactions",isLoggedIn,  async(req, res)=>{
    const user = req.user;
    try{
    const transaction = await TransactionModel.find({userId:user._id});
    res.json(transaction);
    }catch(err){
        res.status(400).json(err);
    }

});
module.exports = router;