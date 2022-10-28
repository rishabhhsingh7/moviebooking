const auth = require("../../middleware/auth.js");

module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  router.post("/signup", users.signUp);

  router.post("/login", users.login);

  router.post("/logout", auth, users.logout);

  app.use("/auth", auth, router);
};

/*
      Singup
      URL -> http://localhost:3000/api/signup
      body -> {
        "email" : "test@test.com",
        "password" : "xyz123",
        "role" : "user"
  }
  
      Login 
      URL -> http://localhost:3000/api/login
      body -> {
        "email" : "test@test.com",
        "password" : "xyz123"
   }
  
      Logout
      URL -> http://localhost:3000/api/logout
      body -> {
        "id": "someid"
  }
    */