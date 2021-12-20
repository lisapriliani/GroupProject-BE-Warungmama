const mongoose = require("mongoose")

const opts = {
  timestamps: true
}

const ProductSchema = new mongoose.Schema({
  nama: {
    type: String
  },
  tipe: {
    type: String
  },
  stok: {
    type: Number
  },
  deskripsi: {
    type: String
  },
  gambar: {
    type: Array
  },
  harga: {
    type: Number
  },
  reviewID: {
    type: mongoose.ObjectId
  }
}, opts)

module.exports = mongoose.model("Products", ProductSchema)