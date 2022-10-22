// const auth = require("../../middleware/auth");

module.exports = (app) => {
    const genres = require("../controllers/genre.controller.js");
  
    var router = require("express").Router();
  
    router.get("/genres", genres.findAllGenres);
  
    app.use("/api", router);
    //Add auth as Middleware in above line
  };