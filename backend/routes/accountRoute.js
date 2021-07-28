const express = require("express");
const _ = require("lodash");
const Account = require("../models/Account");
const verify = require("../services/verifyToken");

const router = express.Router();

//all accounts
router.get("/", async (req, res) => {
  try {
    res.json(await Account.find());
  } catch (e) {
    res.json({ message: e });
  }
});

//Get one account
router.post("/getAccount", async (req, res) => {
  try {
    const account = await Account.findOne({
      accountNumber: req.body.accountNumber,
      bank: req.body.bank,
    });
    res.json(account);
  } catch (e) {
    res.json({ message: e });
  }
});

//deposit funds
router.post("/depBalance/:id", verify, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    account.balance += req.body.amount;
    await account.save().then(() => res.json(account));
  } catch (e) {
    res.json({ message: e });
  }
});

//withdraw funds
router.post("/witBalance/:id", verify, async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);

    account.balance -= req.body.amount;
    await account.save().then(() => res.json(account));
  } catch (e) {
    res.json({ message: e });
  }
});

//transfer funds
router.post("/transfer/:id", verify, async (req, res) => {
  try {
    let [myAccount, recAccount] = await Promise.all([
      Account.findById(req.params.id),
      Account.findOne({
        accountNumber: req.body.accountNumber,
        bank: req.body.bank,
      }),
    ]);

    myAccount.balance -= req.body.amount;
    recAccount.balance += req.body.amount;

    [myAccount, recAccount] = await Promise.all([
      myAccount.save(),
      recAccount.save(),
    ]);

    res.json(myAccount);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = { router };
