const express = require("express");
const cors = require("cors");
const userAuthRoute = require("./routes/userAuthRoute");
const helmet = require("helmet");
// const session = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",

    methods: ["GET", "POST"],

    allowedHeaders: ["Content-Type"],

    credentials: true
  })
);
// app.use(helmet());
app.use(cookieParser());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next();
});
// app.set("trust proxy", 1); // trust first proxy

// app.use(
//   session({
//     name: "session",
//     keys: ["key1", "key2"],
//     cookie: {
//       secure: true,
//       httpOnly: true,
//       expires: () => new Date(Date.now() + 5 * 60 * 1000),
//     },
//   })
// );

app.use("/userAuths", userAuthRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => console.log("listening at port " + port));
