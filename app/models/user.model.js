module.exports = (mongoose) => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          userid: { type: Number, unique: true, required: true },
          first_name: { type: String, required: true, trim: true },
          last_name: { type: String, required: true, trim: true },
          username: { type: String, required: true, unique: true, trim: true },
          contact: {
            type: Number,
            required: function () {
              return this.contact.length === 10;
            },
            unique: true,
          },
          password: { type: String, required: true },
          role: {
            type: String,
            required: true,
            default: "user",
          } /*types: admin ,user*/,
          isLoggedIn: { type: Boolean, default: false },
          uuid: { type: String, unique: true },
          accesstoken: { type: String, unique: true },
          coupens: [
            {
              id: { type: Number, required: true, unique: true },
              discountValue: { type: Number, required: true },
            },
          ],
          bookingRequests: [
            {
              reference_number: { type: Number, required: true, unique: true },
              coupon_code: { type: Number, required: true, unique: true },
              show_id: Number,
              tickets: [Number],
            },
          ],
        },
        { timestamps: true }
      )
    );
  
    return User;
  };