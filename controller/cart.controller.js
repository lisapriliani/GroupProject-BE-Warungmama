
const CartModel = require("../models/cart.model")

/* exports.getAll = async (req, res) => {
  try {
    // get id usernya dari session untuk mengambil keranjang yang hanya dimiliki user tersebut
    const owner = req.user._id
    const cart = await CartModel.find({userID: owner}).populate("produk")
    if(cart){
      // hitung total price per item

      // hitung total price all item

      res.send({cart: cart})
    } else {
      res.send({message: "You don't have product on your cart, let's go shopping"})
    }
  } catch (error) {
    res.send({message: error})
  }
  
} */

exports.getAll = async (req, res) => {
  try {
    const cart = await CartModel.find().populate("produk")
    res.send({cart: cart})
  } catch (error) {
    res.send({message: error})
  }
  
}