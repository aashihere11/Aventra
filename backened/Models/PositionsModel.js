const { model } = require("mongoose");

const { PositionsSchema } = require("../Schemas/PositionsSchema");

const PositionsModel =  model("Position", PositionsSchema);

module.exports = { PositionsModel };