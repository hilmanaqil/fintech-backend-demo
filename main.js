const express = require("express");
const cors = require("cors");
const account = require("./account");
const user = require("./user");

server = express();
server.use(express.json());
server.use(cors());

server.use(account.router);
server.use(user.router);

server.listen(3000, (errors) => {
  if (errors) {
    console.log("Server couldn't start. Error: " + errors);
  } else {
    console.log("Server started on port 3000");
  }
});
