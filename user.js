const express = require("express");
const data = require("./data");

router = express.Router();

router.get("/user/all", (request, response) => {
    let users = data.get_all_users(); // somehow get the users;
    response.send(users);
  });
  
  router.get("/user/by-uid", (request, response) => {
    let user_id = request.query.user_id;
    let user = data.get_user_by_user_id(user_id); // get a user based on user_id I get in the request.
    response.send(user);
  });
  
  router.post("/user/add", (request, response) => {
    // Step 1: need to get the user object from the request
    let user = request.body;
  
    // Step 2: Call the function to save the user object in data
    data.add_user(user);
  
    // Step 3: Return the success response
    response.send("Added successfully!");
  });

  module.exports = { router };
  