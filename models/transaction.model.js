const mongoose = require("mongoose")

const ProdukSchema = new mongoose.Schema({
  productID : {
    type: mongoose.Types.ObjectId,
    ref: 'Products'
  },
  qty: Number,
  itemPrice: Number
}, { _id : false })

const TransactionSchema = new mongoose.Schema({
  keranjangID: {
    type: mongoose.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  produk: [ProdukSchema],
  alamat: String,
  metodePengambilan: String,
  totalOngkir: Number,
  totalPrice: Number
}, {versionKey: false})

const TransactionModel = mongoose.model("Transaction", TransactionSchema)
module.exports = TransactionModel