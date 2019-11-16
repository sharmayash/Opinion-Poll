const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// create schema

const OpinionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  },
  pets: {
    type: String,
    required: true
  },
  pl: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("opinions", OpinionSchema);
