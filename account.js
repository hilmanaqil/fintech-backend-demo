const express = require("express");
const data = require("./data");
const database = require("./database");

router = express.Router();

//Get all account
router.get('/account/all', (req, res) => {
  database.connection.query(`SELECT * from account`, (err, results) => {
      if (err) {
      console.log(err);
      } else {
          res.send(results);
      }
      });
})

//Get account by user_id
router.get('/account', (req, res) => {
  let user_id = req.query.user_id;
  database.connection.query(`SELECT * from account WHERE user_id = ${user_id}`, (err, results) => {
      if (err) {
          console.log(err);
          } else {
              if (results.length !== 0) {
                  res.send(results);
                  console.log(`User ${user_id}'s account displayed.`)
              } else {
                  res.send("No such account.")
              }
              
          }
  })
})

/* 
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
*/
  module.exports = { router };
  
  