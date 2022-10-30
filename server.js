const express = require("express");
const db = require("./app/models");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8085;

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose Connection
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

// Default route for the index or root path
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

require("./app/routes/artist.routes")(app);
require("./app/routes/genre.routes")(app);
require("./app/routes/movie.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(port, () => console.log("App listening on port: " + port));
module.exports = app;

// Hard-coded Routes are commented
// app.get("/movies", (req, res) => {
//   res.send("All Movies Data in JSON format from Mongo DB");
// });

// app.get("/genres", (req, res) => {
//   res.send("All Genres Data in JSON format from Mongo DB");
// });

// app.get("/artists", (req, res) => {
//   res.send("All Artists Data in JSON format from Mongo DB");
// });