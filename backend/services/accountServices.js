const Account = require("../models/Account");
const _ = require("lodash");

const createAccount = async (bank) => {
  const docCount = await Account.find().countDocuments(
    {
      bank: bank,
    },
    function (err, count) {
      if (err) {
        res.json({ message: err });
        return 0;
      }
    }
  );

  const account = new Account({
    accountNumber:
      _.repeat("0", 10 - docCount.toString().length) + docCount.toString(),
    bank: bank,
    balance: 0,
  });

  return account.save().catch((e) => {
    return new Error("failed to create account\n Error: " + e);
  });
};

module.exports = { createAccount };
