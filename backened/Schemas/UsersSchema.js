const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
     minlength: 8,
    maxlength: 64
  },
  email: {
    type: String,
    required:true,
    unique:true
  }
});

module.exports = {UserSchema}
