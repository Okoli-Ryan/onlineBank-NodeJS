const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
var cookies = require("cookie-parser");
const session = require("cookie-session");

const userRoute = require("./routes/userRoute");
const { router: accountRoute } = require("./routes/accountRoute");

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
      httpOnly: false,
      expires: () => new Date(Date.now() + 60 * 60 * 1000),
    },
  })
);

app.use("/users", userRoute);
app.use("/accounts", accountRoute);

app.listen(3000, () => console.log("listening at port 3000"));
