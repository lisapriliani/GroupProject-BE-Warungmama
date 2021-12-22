const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    // ref: 'User',
    required: true
  },
  produk: [{
    type: mongoose.Types.ObjectId,
    ref: 'Products'
  }]
})

module.exports = mongoose.model("Cart", CartSchema)