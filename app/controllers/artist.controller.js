const db = require("../models");
const Artist = db.artists;

// findAllArtists() - to get all Artists.
exports.findAllArtists = (req, res) => {

  Artist.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Artists.",
      });
    });
};