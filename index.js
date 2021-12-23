const express = require("express");
const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const cors = require("cors");
const DBconnection = require("./config/");
const routes = require("./router");
require("dotenv").config();
const { uri } = process.env;

async function main() {
  try {
    await DBconnection(uri);
    const app = express();
    const port = process.env.port || 5000;
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use(cors());
    app.use(routes);
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("main:", error);
  }
}

main();
