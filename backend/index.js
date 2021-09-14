const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const session = require("cookie-session");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const { router: accountRoute } = require("./routes/accountRoute");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",

    methods: ["GET", "POST"],

    allowedHeaders: ["Content-Type"],

    credentials: true,
  })
);
// app.use(helmet());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// app.set("trust proxy", 1); // trust first proxy

// app.use(
//   session({
//     name: "session",
//     keys: ["key1", "key2"],
//     cookie: {
//       secure: true,
//       httpOnly: false,
//       expires: () => new Date(Date.now() + 60 * 60 * 1000),
//     },
//   })
// );

app.use("/users", userRoute);
app.use("/accounts", accountRoute);

app.listen(port, () => console.log("listening at port " + port));
