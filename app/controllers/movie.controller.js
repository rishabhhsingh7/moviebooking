const db = require("../models");
const Movie = db.movies;

// findAllMovies() - to search the movie by status.

// if no status is passed then all movies are retrieved

// Request Example
// movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}

exports.findAllMovies = (req, res) => {
  //Logging Request Object
  console.log(req.query);

  //Creating an Object to set the key of the query object dynamically.
  let searchObj = {};

  if (req.query.status !== undefined && req.query.status !== "") {
    const status = req.query.status.toLowerCase();
    searchObj[status] = true;
  }

  if (req.query.title !== undefined && req.query.title !== "") {
    const title = req.query.title;
    const queryObj = { $regex: new RegExp(title), $options: "i" };
    searchObj["title"] = queryObj;
  }

  if (req.query.genres !== undefined && req.query.genres !== "") {
    const genres = req.query.genres.toLowerCase();
    searchObj["genres"] = genres;
  }
  if (req.query.artists !== undefined && req.query.artists !== "") {
    const artists = req.query.artists;
    const [firstName, lastName] = artists.split(/\s+/);
    // console.log(firstName, lastName);
    searchObj["artists"] = {
      $elemMatch: {
        first_name: firstName.toLowerCase(),
        last_name: lastName.toLowerCase(),
      },
    };
  }

  // Both the Start and End Date are specified
  if (
    req.query.start_date !== undefined &&
    req.query.start_date !== "" &&
    req.query.end_date !== undefined &&
    req.query.end_date !== ""
  ) {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const queryObj = {
      $gte: new Date(start_date).toISOString(),
      $lte: new Date(end_date).toISOString(),
      // $gte: start_date,
      // $lte: end_date,
    };
    searchObj["release_date"] = queryObj;
  } else {
    // Only Start Date is specified
    if (req.query.start_date !== undefined && req.query.start_date !== "") {
      const start_date = req.query.start_date;
      const queryObj = { $gte: new Date(start_date).toISOString() };
      searchObj["release_date"] = queryObj;
    } else if (req.query.end_date !== undefined && req.query.end_date !== "") {
      // Only End Date is Specified
      const end_date = req.query.end_date;
      const queryObj = { $lte: new Date(end_date).toISOString() };
      searchObj["release_date"] = queryObj;
    } else {
      console.log("Date Query not Defined/Specified");
    }
  }

  // if (genres) searchObj["genres"] = genres;
  // if (artists) searchObj["artists"] = artists;

  console.log(searchObj);

  Movie.find(searchObj)
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
  const id = req.params.movieId;
  // console.log(id);

  //Creating an Object to set the key of the query object dynamically.
  let searchObj = { movieid: id };
  // console.log(searchObj);

  Movie.findOne(searchObj)
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
  const id = req.params.movieId;
  // console.log(id);

  //Creating an Object to set the key of the query object dynamically.
  let searchObj = { movieid: id };
  // console.log(searchObj);

  Movie.findOne(searchObj)
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
