const router = require('express').Router();
const { HoldingsModel } = require("../Models/HoldingsModel.js");
const { PositionsModel } = require("../Models/PositionsModel.js");
const { OrdersModel } = require("../Models/OrdersModel.js");
const isLoggedIn = require('../middleware/auth.js');



// updating holdings
async function updateHoldings(user, { name, qty, price, mode, pc }) {
    console.log("req aayi");
    const holding = await HoldingsModel.findOne({ userId: user._id, name: name });
    if (mode === "BUY") {

        const totalqty = holding ? holding.qty + qty : qty;
        const totalprice = holding ? holding.price + price : price;
        const avgPrice = (holding ? holding.avg * holding.qty + price * qty : totalprice) / totalqty;
        const curValue = totalqty * totalprice;
        const investment = totalqty * avgPrice;

        await HoldingsModel.updateOne(
            { userId: user._id, name: name },

            {
                $set: {
                    qty: totalqty,
                    avg: avgPrice,
                    price: totalprice,
                    net: curValue - investment,
                    day: curValue - (pc * qty)
                }

            },
            { upsert: true }
        );

    } else {
        const totalqty = holding.qty - qty;
        const totalprice = holding.price - price;
        const avgPrice = holding.avg;
        const curValue = totalqty * totalprice;
        const investment = totalqty * avgPrice;

        await HoldingsModel.updateOne(
            { userId: user._id, name: name },

            {
                $set: {
                    qty: totalqty,
                    avg: avgPrice,
                    price: totalprice,
                    net: curValue - investment,
                    day: curValue - (pc * qty)
                }
            },
        );
    }
}

// update position
async function updatePosition(user, { name, qty, price, mode, product }) {
    try {
        const position = await PositionsModel.findOne({ userId: user._id, name, product });
        if (mode == "BUY") {
            const totalqty = position ? position.qty + qty : qty;
            const totalprice = position ? position.price + price : price;
            const avgPrice = (position ? position.avg * position.qty + price * qty : totalprice) / totalqty;

            await PositionsModel.updateOne(
                { userId: user._id, name: name, product },

                {
                    $set: {
                        product: product,
                        name: name,
                        qty: totalqty,
                        avg: avgPrice,
                    }

                },
                { upsert: true }
            );
        }
    }
    catch (error) {
        console.log(error);
    }
}

router.get("/allOrders", isLoggedIn, async (req, res) => {
    const user = req.user;
    let allOrders = await OrdersModel.find({ userId: user._id });
    res.json(allOrders);
});

router.post("/Order", isLoggedIn, async (req, res) => {
    const { name, qty, price, mode, pc, product } = req.body;
    const user = req.user;
    try {

        let newOrder = new OrdersModel({
            userId: user._id,
            name: name,
            qty: qty,
            price: price,
            mode: mode,
        });

        await newOrder.save();

        // update positions

        await updatePosition(user, { name, qty, price, mode, product });

        //Update Holdings accordingly
        console.log(product);
        if (product === "CNC") {
            await updateHoldings(user, { name, qty, price, mode, pc });
        }
    }
    catch (err) {
        console.log(err);
    }});

    module.exports = router;