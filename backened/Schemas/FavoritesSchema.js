const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const FavoritesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Symbol: {
         type: String, 
         index: true ,
         },
    
});

module.exports = { FavoritesSchema};