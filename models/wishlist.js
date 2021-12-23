const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectID,
      // require: true,
      ref: "User",
    },
    productID: [
      {
        type: mongoose.Schema.Types.ObjectID,
        // require: true,
        ref: "Product", //mastiin dulu namanya ke jessica
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WishlistModel = mongoose.model("Wishlist", wishlistSchema);
module.exports = WishlistModel;
