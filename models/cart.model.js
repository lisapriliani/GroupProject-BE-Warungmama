const mongoose = require("mongoose")

const ProdukSchema = new mongoose.Schema({
  productID : {
    type: mongoose.Types.ObjectId,
    ref: 'Products'
  },
  qty: {
    type: Number,
    default: 1
  }
}, { _id : false })

const CartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    // ref: 'User',
    required: true
  },
  produk: [ProdukSchema]
}, {versionKey: false})

module.exports = mongoose.model("Cart", CartSchema)