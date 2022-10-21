module.exports = (mongoose) => {
    const Movie = mongoose.model(
      "movie",
      mongoose.Schema(
        {
          movieid: { type: Number, unique: true, required: true },
          title: { type: String, required: true },
          published: Boolean,
          released: Boolean,
          poster_url: {
            type: String,
            default:
              "https://thumbs.dreamstime.com/b/movie-film-company-logo-design-vector-template-movie-film-company-logo-design-inspiration-vector-template-167661473.jpg",
          },
          release_date: { type: Date, required: true },
          publish_date: { type: Date, required: true },
          artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
          genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "genre" }],
          duration: Number,
          critic_rating: Number,
          trailer_url: {
            type: String,
            default:
              "https://thumbs.dreamstime.com/b/movie-film-company-logo-design-vector-template-movie-film-company-logo-design-inspiration-vector-template-167661473.jpg",
          },
          wiki_url: {
            type: String,
            default:
              "https://thumbs.dreamstime.com/b/movie-film-company-logo-design-vector-template-movie-film-company-logo-design-inspiration-vector-template-167661473.jpg",
          },
          story_line: String,
          shows: [
            {
              id: { type: Number, unique: true, required: true },
              theatre: {
                name: {
                  type: String,
                  required: true,
                },
                city: {
                  type: String,
                  required: true,
                },
              },
              language: String,
              show_timing: Date,
              available_seats: Number,
              unit_price: Number,
            },
          ],
        },
        { timestamps: true }
      )
    );
  
    return Movie;
  };