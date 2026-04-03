const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");
const { UsersModel } = require("./Models/UsersModel")
const { FavoritesModel } = require("./Models/FavoritesModel");
const cors = require('cors');
const finnhub = require('finnhub');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const isLoggedIn = require('./middleware/auth.js');
const axios = require('axios');
app.use(cookieParser());


const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const finnhubClient = new finnhub.DefaultApi(process.env.FINNHUB_API_KEY)


async function getQuote(symbols) {
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

      await PositionsModel.updateMany({ name: symbol }, { $set: { price: data.c } });
    }
    catch (err) {
      console.error(`Failed to fetch ${symbol}:`, err);
    }

  }
  console.log(results)
  return results;
}


//searching and fetching stocks
app.get("/search", async (req, res) => {
  const query = req.query.q;
  console.log(query);

  try {
    const { data } = await axios.get("https://finnhub.io/api/v1/search",
      { params: { q: query, token: process.env.FINNHUB_API_KEY } });

    const filteredResults = data.result.slice(0, 5).map(stock => stock.symbol);

    const results = await getQuote(filteredResults);
    res.json(results);
  }
  catch (err) {
    console.error("Failed to fetch :", err);
  }

});


//adding and deleting favorites

app.post("/favorites", isLoggedIn, async (req, res) => {
  const symbol = req.body.symbol;
  const user = req.user;

  try {
    const existing = await FavoritesModel.findOne({ userId: user._id, Symbol: symbol });

    if (existing) {
      //remove it
      await FavoritesModel.deleteOne({ _id: existing._id, Symbol: symbol });
      res.json({ isFav: false })

    }
    else {
      // add it 
      await FavoritesModel.create({ userId: user._id, Symbol: symbol });
      res.json({ isFav: true });
    }
  } catch (error) {
    console.log(error);
  }

})

//fetching stocks
app.post("/stocks", isLoggedIn, async (req, res) => {
  const user = req.user;
  console.log(user);
  const symbols = await FavoritesModel.find({ userId: user._id })
  const symbolsArray = symbols.map(f => f.Symbol);
  console.log(symbolsArray);
  const results = await getQuote(symbolsArray);
  res.json(results);
})

// get all holdings
app.get("/allHoldings", isLoggedIn, async (req, res) => {
  const user = req.user;
  try {
    let allHoldings = await HoldingsModel.find({ userId: user._id });
    res.json(allHoldings);

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
app.get("/allOrders", isLoggedIn, async (req, res) => {
  const user = req.user;
  let allOrders = await OrdersModel.find({ userId: user._id });
  res.json(allOrders);
});
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
//updating positions
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
// create new order
app.post("/Order", isLoggedIn, async (req, res) => {
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
  }
});

app.get("/me", isLoggedIn, (req, res) => {
  const user = req.user;
  res.json({ user });
});


//user registration
app.post("/create", async (req, res) => {
  const { username, password, email } = req.body;

  const isAlreadyRegistered = await UsersModel.findOne({
    $or: [{ username }, { email }]
  });

  if (isAlreadyRegistered) {
    return res.status(409).json({
      message: "username or email already exists"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      const User = await UsersModel.create({
        username,
        email,
        password: hash
      })

      const token = jwt.sign({ email, username }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 604800000
      });
      res.status(201).json({ success: true, message: "User created successfully" });
    });
  });
});

// login user

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
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 604800000
      });
      res.status(201).json({ success: true, user: { username: user, email: user.email } });
    }
    else {
      return res.status(404).json({
        message: "password is incorrect"

      });
    }
  })


});

// logout user

app.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({ success: false });
  }
})
// get holding
app.get("/holdings/:symbol/:product", isLoggedIn, async (req, res) => {
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

//  get position 

app.get("/positions/:symbol/:product", isLoggedIn, async (req, res) => {
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