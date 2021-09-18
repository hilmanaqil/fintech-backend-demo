const express = require("express");
const data = require("./data");

router = express.Router();

router.get("/account/all", (request, response) => {
    // Step 1 - Get all the accounts
    let accounts = data.get_all_accounts();
  
    // Step 2 - Return the accounts as response
    response.send(accounts);
  });
  
  router.get("/account/by-aid", (request, response) => {
    // Step 1 - Extract the account_id from the request
    let account_id = request.query.account_id;
  
    // Step 2 - Get account information from the data
    let account = data.get_account_by_account_id(account_id);
  
    // Step 3 - Return the account information
    response.send(account);
  });
  
  router.post("/account/add", (request, response) => {
    let account = request.body;
    data.add_account(account);
    response.send("Added successfully!");
  });

  module.exports = { router };
  
  