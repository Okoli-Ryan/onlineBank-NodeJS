const mongoose = require("mongoose");
const { bankConnection } = require("../db/connectionMongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accounts",
  },
});

module.exports = bankConnection.model("Users", userSchema);
