const express = require("express");
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const app = express();
const port = 9000;

app.get("/movies", (req, res) => {
  res.send("All Movies Data in JSON format from Mongo DB");
});

app.get("/genres", (req, res) => {
  res.send("All Genres Data in JSON format from Mongo DB");
});

app.get("/artists", (req, res) => {
  res.send("All Artists Data in JSON format from Mongo DB");
});

app.listen(port, () => console.log("App listening on port: " + port));
module.exports = app;