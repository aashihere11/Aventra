const router = require('express').Router();
const { HoldingsModel } = require("../Models/HoldingsModel.js");
const isLoggedIn = require('../middleware/auth.js');

router.get("/allHoldings", isLoggedIn, async (req, res) => {
    const user = req.user;
    try {
        let allHoldings = await HoldingsModel.find({ userId: user._id });
        res.json(allHoldings);
    }
    catch (err) {
        console.log(err);
    }
});

router.get("/:symbol/:product", isLoggedIn, async (req, res) => {
  const { symbol, product } = req.params;
  const user = req.user;
  try {
    const holding = await HoldingsModel.findOne({
      userId: user._id,
      name: symbol
    });
    res.json({ qty: holding ? holding.qty : 0 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;