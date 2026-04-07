const router = require('express').Router();
const { FavoritesModel } = require("../Models/FavoritesModel.js");
const isLoggedIn = require('../middleware/auth.js');
const axios = require('axios');
require("dotenv").config();
const { PositionsModel } = require("../Models/PositionsModel.js");
const finnhub = require('finnhub');
const finnhubClient = new finnhub.DefaultApi(process.env.FINNHUB_API_KEY);

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

router.post("/stocks", isLoggedIn, async (req, res) => {
    const user = req.user;
    console.log(user);
    const symbols = await FavoritesModel.find({ userId: user._id })
    const symbolsArray = symbols.map(f => f.Symbol);
    console.log(symbolsArray);
    const results = await getQuote(symbolsArray);
    res.json(results);
})

//adding and deleting favorites

router.post("/favorites", isLoggedIn, async (req, res) => {
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
});

//searching and fetching stocks
router.get("/search", async (req, res) => {
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

module.exports = router;