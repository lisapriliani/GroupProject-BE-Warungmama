const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productID: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: "Product",
    },
  ],
  tanggal: {
    type: Date,
  },
  bintang: {
    type: Number,
  },
  deskripsi: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
  },
});
const ReviewModel = mongoose.model("Review", reviewSchema);
module.exports = ReviewModel;
