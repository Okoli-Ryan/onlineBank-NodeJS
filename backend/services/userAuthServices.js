const UserAuth = require("../models/UserAuth");

const setConfirmationCode = (code, id) => {
  const userAuth = new UserAuth({
    _id: id,
    status: "pending",
    confirmationCode: code,
  });

  userAuth
    .save()
    .then(() => console.log("saved to userAuth"))
    .catch((e) => console.log("couldnt save to userAuth..." + e));
};

module.exports = { setConfirmationCode };
