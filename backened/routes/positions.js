const router = require('express').Router();
const { PositionsModel } = require("../Models/PositionsModel.js");
const isLoggedIn = require('../middleware/auth.js');

router.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({}).lean();
  res.json(allPositions);
});

router.get("/:symbol/:product", isLoggedIn, async (req, res) => {
  const { symbol, product } = req.params;
  const user = req.user;
  try {
    const position = await PositionsModel.findOne({
      userId: user._id,
      name: symbol,
      product: product
    });
    res.json({ qty: position ? position.qty : 0 });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});

module.exports = router;