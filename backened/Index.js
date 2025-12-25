const express = require ("express");
const mongoose = require ("mongoose");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGO_URL;


app.get("/", (req,res) =>{
    res.send("connected")
});

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
    mongoose.connect(mongoURL);
    console.log("connected to mongoDB");
});