const res = require("express/lib/response");
const ReviewModel = require("../models/review");
const WishlistModel = require("../models/wishlist");

class reviewcontroller {
  static async getReview(req, res) {
    try {
      const Review = await ReviewModel.find();
      res.send(review);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
  static async postReview(req, res) {
    try {
      const { productID } = req.body;
      const review = new ReviewModel({
        productID: productID,
      });
      const save = await review.save();
      res.send(save);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }

  static async patchReview(req, res) {
    try {
      const body = req.body;
      const reviewId = req.params.id;
      const review = {
        userID: body.userID,
        deskripsi: body.deskripsi,
        bintang: body.bintang,
        tanggal: body.tanggal,
        productID: body.productID,
      };
      const reviewdata = await ReviewModel.findOneAndUpdate({ _id: reviewId }, review);
      res.status(200).json({
        message: "data berhasil terupdate !",
        data: reviewdata,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  }
}
module.exports = reviewcontroller;
