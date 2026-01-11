const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required:true,
    unique:true
  }
});

const pulgin = {
  userExistsError: 'This username is already taken. Please try another.',
    missingPasswordError: 'No password was provided.',
    missingUsernameError: 'Please enter a username.',
    missingEmailError: 'please enter an email.',
    incorrectPasswordError: 'Invalid username or password.',
    incorrectUsernameError: 'Invalid username or password.'
}
UserSchema.plugin(passportLocalMongoose, pulgin);
module.exports = {UserSchema}
