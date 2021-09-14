const express = require("express");
const User = require("../models/User");
const { createAccount } = require("../services/accountServices");
const sendMail = require("../services/userServices");

const router = express.Router();

//Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate(
      "account",
      "accountNumber bank -_id"
    );
    res.json(users);
  } catch (e) {
    res.json({ error: e });
  }
});

//test
router.post("/test", async (req, res) => {
  res.json(req.body);
});

//save user
router.post("/", async (req, res) => {
  const account = await createAccount(req.body.bank);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    account: account._id,
    _id: account._id,
  });

  user
    .save()
    .then(() =>
      sendMail(req.body.name, req.body.email, account._id, req.body.bank)
    )
    .then((data) => res.status(201).json(data))

    .catch((e) => {
      res.json({ error: e });
      console.log(e);
    });
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.json({ error: e });
  }
});

module.exports = router;
