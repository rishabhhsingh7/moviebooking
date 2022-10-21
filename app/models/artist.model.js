module.exports = (mongoose) => {
    const Artist = mongoose.model(
      "artist",
      mongoose.Schema(
        {
          artistid: { type: Number, unique: true, required: true },
          first_name: { type: String, required: true },
          last_name: { type: String, required: true },
          wiki_url: {
            type: String,
            default:
              "https://thumbs.dreamstime.com/b/movie-film-company-logo-design-vector-template-movie-film-company-logo-design-inspiration-vector-template-167661473.jpg",
          },
          profile_url: {
            type: String,
            default:
              "https://thumbs.dreamstime.com/b/movie-film-company-logo-design-vector-template-movie-film-company-logo-design-inspiration-vector-template-167661473.jpg",
          },
          movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
        },
        { timestamps: true }
      )
    );
  
    return Artist;
  };