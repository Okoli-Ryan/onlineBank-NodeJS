const mongoose = require("mongoose");
require("dotenv/config");

const BANK_URI = process.env.DB_CONNECTION_BANK;
const AUTH_URI = process.env.DB_CONNECTION_AUTH;

function createConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  db.once("connected", function () {
    console.log("connected banking db for port for " + this.name);
  });

  db.on("error", function (error) {
    console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.log(`MongoDB :: failed to close connection ${this.name}`)
    );
  });

  return db;
}
 
const bankConnection = createConnection(BANK_URI);
const authConnection = createConnection(AUTH_URI);

module.exports = { bankConnection, authConnection };
