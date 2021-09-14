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
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: user,
      pass: pass,
    },
  });

  //!change of url for verification
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Welcome to the OnlineBanking Platform. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/verify/${id}/${jwtSecret}> Click here</a>
        </div>`,
    })
    .then(() => setConfirmationCode(jwtSecret, id))
    .catch((err) => console.log(err));
};

module.exports = sendMail;
