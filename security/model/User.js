const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model("User", userSchema, 'users');
module.exports = userModel;