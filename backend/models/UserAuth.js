const mongoose = require("mongoose");
const { authConnection } = require("../db/connectionMongoose");

const userAuthSchema = new mongoose.Schema({
  pin: String,
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "active"],
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});

module.exports = authConnection.model("UserAuths", userAuthSchema);
