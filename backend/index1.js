const express = require("express");
const cors = require("cors");
const userAuthRoute = require("./routes/userAuthRoute");
const helmet = require("helmet");
var cookies = require("cookie-parser");
const session = require("cookie-session");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookies());
app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    name: "session",
    keys: ["key1", "key2"],
    cookie: {
      secure: true,
      httpOnly: true,
      expires: () => new Date(Date.now() + 5 * 60 * 1000),
    },
  })
);

app.use("/userAuths", userAuthRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4000, () => console.log("listening at port 4000"));
