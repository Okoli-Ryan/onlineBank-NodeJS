const mongoose = require("mongoose");
const { bankConnection } = require("../db/connectionMongoose");

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    min: 10,
    max: 10,
  },
  bank: String,
  balance: {
    type: Number,
    default: 0,
  },
});

accountSchema.index({ accountNumber: 1, bank: 1 }, { unique: true });

module.exports = bankConnection.model("Accounts", accountSchema);
