const mongoose = require("mongoose")

const opts = {
  timestamps: true
}

const ProductSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  tipe: {
    type: String,
    required: true
  },
  stok: {
    type: Number,
    required: true
  },
  deskripsi: {
    type: String
  },
  gambar: {
    type: Array
  },
  harga: {
    type: Number,
    required: true
  },
  reviewID: [{
    type: mongoose.Types.ObjectId,
    default: []
    // ref: 'Reviews'
  }]
}, opts)

module.exports = mongoose.model("Products", ProductSchema)