const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const isLoggedIn = require('./middleware/auth.js');
const { WalletModel } = require('./Models/WalletsModel.js');


app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;
app.use(cors({
  origin: ['http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174',
    'https://aventra-9a7b.onrender.com'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/stock', require('./routes/stocks'));
app.use('/order', require('./routes/orders'));
app.use('/holding', require('./routes/holdings'));
app.use('/position', require('./routes/positions'));
app.use('/payment', require('./routes/payment'));
app.use('/transaction', require('./routes/transaction'));


app.get("/balance", isLoggedIn, async (req, res) => {
  const user = req.user;
  const wallet = await WalletModel.findOne({ userId: user._id })
  res.json({ balance: wallet.balance });
});
app.get("/me", isLoggedIn, (req, res) => {
  const user = req.user;
  res.json({ user });
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
