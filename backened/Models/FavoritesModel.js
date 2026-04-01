const {model} = require("mongoose");
const { FavoritesSchema } = require("../Schemas/FavoritesSchema");

const FavoritesModel = model("Favorite", FavoritesSchema);

module.exports = {FavoritesModel};