const express = require("express");
const data = require("./data");
const database = require("./database");

router = express.Router();

router.get("/bill/all", (request, response) => {
  // let users = data.get_all_users(); // somehow get the users;
  // response.send(users);

  database.connection.query(`select * from bill`, (errors, records) => {
    if (errors) {
      console.log(errors);
      response.status(500).send("An error occurred in the backend");
    } else {
      response.status(200).send(records);
    }
  });
});

router.get("/bill/by-uid", (request, response) => {
  // let user_id = request.query.user_id;
  // let user = data.get_user_by_user_id(user_id); // get a user based on user_id I get in the request.
  // response.send(user);

  database.connection.query(
    `select * from bill where user_id = '${request.query.user_id}'`,
    (errors, records) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("An error occurred in the backend");
      } else {
        response.status(200).send(records);
      }
    }
  );
});

/*
router.post("/user/add", (request, response) => {
  // // Step 1: need to get the user object from the request
  // let user = request.body;

  // // Step 2: Call the function to save the user object in data
  // data.add_user(user);

  // // Step 3: Return the success response
  // response.send("Added successfully!");

  let user = request.body;
  database.connection.query(
    `insert into user (first_name,last_name, email, phone, plan_id, signup_date)
    values ('${user.first_name}', '${user.last_name}', '${user.email}', '${user.phone}', '${user.plan_id}', NOW())`,
    (errors, records) => {
      if (errors) {
        console.log(errors);
        response.status(500).send("Some error occurred at the backend");
      } else {
        response.status(200).send("Created new user!");
      }
    }
  );
});
*/

module.exports = { router };
