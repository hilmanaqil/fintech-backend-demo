const express = require("express");
const database = require("./database");

server = express();
server.use(express.json());

router = express.Router();

router.get("/user/by-uid", (request, response) => {
  database.connection.query(
    `select * from user where user_id = ${request.query.user_id}`,
    function (error, results) {
      if (error) throw error;
      response.send(results);
    }
  );
});

server.use(router);

server.listen(3000);
