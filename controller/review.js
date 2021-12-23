const res = require("express/lib/response");
const { dataToken } = require("../helpers");
const ReviewModel = require("../models/review");
const HistoryModel = require("../models/history.model");
const ProductModel = require("../models/products.model")

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date+' '+time;
class reviewcontroller {
  static async getReview(req, res) {
    try {
      const review = await ReviewModel.find();
      res.send(review);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  }
  static async postReview(req, res) {
    const {data} = dataToken(req, res)
    try {
      const historyID = req.params.historyID
      const userHistory = await HistoryModel.findOne({_id: historyID, userID: data._id})
      
      if (userHistory) {
        const { productID, deskripsi, bintang } = req.body;
        
        const filterHistory = userHistory.produk.find(produk => produk.productID == productID)
        
        if(filterHistory) {
          const checkReview = await ReviewModel.findOne({productID: productID, historyID: historyID})

          if(checkReview)
            return res.sendStatus(400)

          const review = new ReviewModel({
            productID: productID,
            deskripsi: deskripsi,
            bintang: bintang,
            historyID: historyID,
            tanggal: dateTime
          });
          
          const product = await ProductModel.findOne({_id: productID})
          const save = await review.save();
          product.reviewID.push(save._id)
          product.save()

          res.send(save);
        } else {
          res.sendStatus(400)
        }
      } else {
        res.sendStatus(400)
      }

    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  static async patchReview(req, res) {
    try {

      const body = req.body;
      const reviewId = req.params.id;
      const review = {
        deskripsi: body.deskripsi,
        bintang: body.bintang,
        tanggal: dateTime,
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
