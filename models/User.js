const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    index: 1
  },
  password: {
    type: String,
  },
  googleId:{
    type: String,
  },
  isAdmin: {
    type: Boolean, 
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', ClientSchema);
