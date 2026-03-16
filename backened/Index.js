const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");
const { UsersModel } = require("./Models/UsersModel")
const cors = require('cors');
const finnhub = require('finnhub');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(cookieParser());


const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
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

// get all holdings
app.get("/allHoldings", async (req, res) => {
  try {

    let allHoldings = await HoldingsModel.find({}).lean();
    res.json(allHoldings);
    console.log(allHoldings);

  }
  catch (err) {
    console.log(err);
  }
});


//get all positions
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({}).lean();
  res.json(allPositions);
});


// get all orders
app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({}).lean();
  res.json(allOrders);
});


// create new order
app.post("/newOrder", async (req, res) => {
  const { name, qty, price, mode, pc } = req.body;
  try {
    let newOrder = new OrdersModel({
      name: name,
      qty: qty,
      price: price,
      mode: mode,
    });

    await newOrder.save();



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

//user registration
app.post("/create", async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await UsersModel.findOne({
    $or: [{ username }, { email }]
  });

  if (existingUser) {
    return res.status(400).json({
      message: existingUser.username == username ? "username already taken!" : "email already registered!"
    });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const User = await UsersModel.create({
        username,
        email,
        password: hash
      })

      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 604800000
      });
      res.status(201).json({ success: true, message: "User created successfully" });
    });
  });
});



app.post('/login', async (req, res) => {
  const user = await UsersModel.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({ message: "something went wrong" });
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 604800000
      });
      res.status(201).json({ success: true });
    }
    else {
      return res.status(404).json({ message: "password is incorrect" });
    }
  })


});


app.get("/", (req, res) => {
  res.send("connected")
});

mongoose.connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  });