const db = require("../models");
const Movie = db.movies;

// findAllMovies() - to search the movie by status.
// if no status is passed then all movies are retrieved
exports.findAllMovies = (req, res) => {
  const status = req.query.status;

  Movie.find({ status: true })
    .sort("-release_date")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Movies based on status.",
      });
    });
};

// findOne() - to fetch all details of a movie given its id.
exports.findOne = (req, res) => {
  const id = req.query.movieid;
  var condition = id
    ? { movieid: { $regex: new RegExp(id), $options: "i" } }
    : {};

  Movie.findOne(condition)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movie by id.",
      });
    });
};

// findShows() - to fetch details of shows of a specific movie given its id.
exports.findShows = (req, res) => {
  const id = req.query.id;
  var condition = id
    ? { movieid: { $regex: new RegExp(id), $options: "i" } }
    : {};

  Movie.findOne(condition)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Movie with id " + id });
      else res.send(data.shows);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movie by id.",
      });
    });
};