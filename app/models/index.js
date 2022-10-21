const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// here mongoose is a variable being passed to artist.model.js
db.artists = require("./artist.model")(mongoose);
db.genres = require("./genre.model")(mongoose);
db.movies = require("./movie.model")(mongoose);
db.users = require("./user.model")(mongoose);

module.exports = db;