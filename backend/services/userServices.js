const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { setConfirmationCode } = require("../services/userAuthServices");

const user = process.env.USER;
const pass = process.env.PASS;

const sendMail = (name, email, id, bank) => {
  const jwtSecret = jwt.sign({ id: id, bank: bank }, process.env.SECRET, {
    expiresIn: "1h",
  });

  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Welcome to the OnlineBanking Platform. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:4000/userAuths/confirm/${id}/${jwtSecret}> Click here</a>
        </div>`,
    })
    .then(() => setConfirmationCode(jwtSecret, id))
    .catch((err) => console.log(err));
};

module.exports = sendMail;
