const express = require ("express");

const app = express();
const port = 3000;

app.get("/", (req,res) =>{
    res.send("connected")
});

app.listen(port, () =>{
    console.log("connected")
});