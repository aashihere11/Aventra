const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");
const{UserModel} = require("./Models/UsersModel")
const cors = require('cors');
const finnhub = require('finnhub');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const passport = require('passport'); 
const app = express();

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());
const finnhubClient = new finnhub.DefaultApi(process.env.FINNHUB_API_KEY)

app.post("/stocks", async (req, res) => {
  const symbols = req.body.symbols;
  const results = [];
  for (const symbol of symbols) {
    try {
      const data = await new Promise((resolve, reject) => {
        finnhubClient.quote(symbol, (error, data) => {
          if (error) {
            reject(error);
          }
          else {
            resolve(data);
          }
        });
      });

      results.push({
        symbol: symbol,
        price: data.c,
        previousClose: data.pc,
        percentChange: ((data.c - data.pc) / data.pc * 100).toFixed(2),
        lastUpdated: new Date().toISOString().slice(0, 19).replace("T", " ")

      });

      await new Promise(resolve => setTimeout(resolve, 500));
    }
    catch (err) {
      console.error(`Failed to fetch ${symbol}:`, err);
    }

  }
  res.json(results);
})


app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  }
  catch (err) {
    console.log(err);
  }
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode, pc } = req.body;
  try {
    let newOrder = new OrdersModel({
      name: name,
      qty: qty,
      price: price,
      mode: mode,
    });

    newOrder.save();



    //Update Holdings accordingly

    const holding = await HoldingsModel.findOne({ name });
    if (mode === "BUY") {

      const totalqty = holding ? holding.qty + qty : qty;
      const totalprice = holding ? holding.price + price : price;
      const avgPrice = (holding ? holding.avg * holding.qty + price * qty : totalprice) / totalqty;
      const curValue = totalqty * totalprice;
      const investment = totalqty * avgPrice;

      await HoldingsModel.updateOne(
        { name: name },
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


    }
  }
  catch (err) {
    console.log(err);
  }
});


app.get("/", (req, res) => {
  res.send("connected")
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  mongoose.connect(mongoURL);
  console.log("connected to mongoDB");
}); 