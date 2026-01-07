const { model } = require("mongoose");

const {UserSchema } = require("../Schemas/UsersSchema");

const UsersModel =  model("User", UserSchema);

module.exports = { UsersModel };