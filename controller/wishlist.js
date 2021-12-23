const res = require("express/lib/response");
const WishlistModel = require("../models/wishlist");
const { dataToken } = require("../helpers");

class wishlistcontroller {
  static async getWishlist(req, res) {
    try {
      const wishlist = await WishlistModel.find();
      res.send(wishlist);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
  static async postWishlist(req, res) {
    try {
      const data = dataToken(req, res);
      const { productID } = req.body;
      const wishlist = new WishlistModel({
        productID: productID,
        userID: data.data._id,
      });
      const save = await wishlist.save();
      res.send(save);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }

  static async deleteWishlist(req, res) {
    try {
      const id = req.body.id;
      const wishlist = await WishlistModel.deleteOne({ _id: id });
      res.send({ msg: "data deleted !" });
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
}
module.exports = wishlistcontroller;
