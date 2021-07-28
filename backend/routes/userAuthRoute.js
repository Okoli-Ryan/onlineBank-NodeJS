const express = require("express");
const UserAuth = require("../models/UserAuth");
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET = process.env.SECRET;
//set pin
router.post("/setPin", async (req, res) => {
  const userAuth = await UserAuth.findById(req.body.id, (err, obj) => {
    if (err) return res.status(500).send({ message: err });

    if (!obj) return res.status(404).send({ message: "user not found" });

    if (obj.status === "pending")
      return res.status(401).send({ message: "verify account first" });

    return obj;
  });

  const token = jwt.sign({ user: userAuth._id }, SECRET, { expiresIn: "2m" });

  userAuth.pin = bcrypt.hashSync(req.body.pin, 8);

  userAuth
    .save()
    .then(() => console.log("user set"))
    .then(() => res.cookie("auth-token", token).send(token))
    .catch(() => res.status(500).send({ message: "error saving userAuth" }));
});

//confirm confirmation code
router.get("/confirm/:id/:confirmationCode", (req, res) => {
  UserAuth.findOne({
    confirmationCode: req.params.confirmationCode,
  }).then((user) => {
    if (!user) return res.status(404).send({ message: "user not found" });

    user.status = "active";
    user._id = req.params.id;
    user.save().then(() =>
      res.status(200).send({
        user: user,
      })
    );
  });
});

//login
router.post("/login", async (req, res) => {
  const getUserId = await Account.findOne(
    {
      accountNumber: req.body.accountNumber,
      bank: req.body.bank,
    },
    function (err, obj) {
      if (err) return { message: err };
      if (!obj) return { message: "no user found!" };

      return obj._id;
    }
  );

  await UserAuth.findById(getUserId, (err, obj) => {
    if (err) return res.status(500).send({ message: err });

    if (!obj) return res.status(500).send({ message: "user id mismatch" });

    if (obj.status === "pending")
      return res
        .status(401)
        .send({ message: "pending verification, go verify your account" });

    const pinValid = bcrypt.compareSync(req.body.pin, obj.pin);

    if (!pinValid) {
      return res.status(401).send({ message: "unauthorized user" });
    } else {
      const token = jwt.sign({ user: obj._id }, SECRET, {
        expiresIn: "2m",
      });
      res
        .cookie("auth-token", token, {
          maxAge: 60000,
        })
        .send(token);
    }
  });
});

// router.get("/reset/:id/:confirmationCode", (req, res) => {
//   UserAuth
// })

router.get("/cookie", (req, res) => {
  console.log(req.cookies);
  res.send({ message: "done" });
});

router.get("/logout", (req, res) => {
  // res.clcookie("auth-token", null);
  res.cookie("auth-token", "", { maxAge: 0 });
  req.user = null;
  res.status(200).send({ message: "logged out" });
});

module.exports = router;
