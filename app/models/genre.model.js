module.exports = (mongoose) => {
    const Genre = mongoose.model(
      "genre",
      mongoose.Schema({
        genreid: { type: Number, unique: true, required: true },
        genre: { type: String, unique: true, required: true },
      })
    );
  
    return Genre;
  };