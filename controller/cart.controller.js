
const { dataToken } = require("../helpers")
const CartModel = require("../models/cart.model")
const UserModel = require("../models/users.model")

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
  const {data} = dataToken(req, res)

  try {
    const role = req.role || null
    
    if(role === 'admin' || role === 'superadmin') {
      const cart = await CartModel.find().populate({
        path: "produk",
        populate: {
          path: "productID"
        }
      })
      res.send({cart: cart})
    } else {
      const userID = data._id

      const cart = await CartModel.findOne({userID: userID}).populate({
        path: "produk",
        populate: {
          path: "productID"
        }
      })

      res.send({cart: cart})
    }
    
  } catch (error) {
    res.status(500).send({message: error})
  }
  
}

// only admin
exports.getCartByUser = async (req, res) => {
  try {
    // const role = req.role || null
    
    // if(role !== 'admin' || role !== 'superadmin') {
    //   return res.sendStatus(403)
    // }

    const userID = req.params.userID
    const cart = await CartModel.findOne({userID: userID}).populate({
      path: "produk",
      populate: {
        path: "productID"
      }
    })
    if(cart)
      res.send({cart: cart})
    else
      res.sendStatus(404)
  } catch (error) {
    res.send({message:error})
  }
}

exports.addCart = async (req, res) => {
  const {data} = dataToken(req, res)

  try {
    // const userID = req.user._id
    const userID = data._id
    const {productID} = req.body

    let cart = await CartModel.findOne({userID: userID})

    if(cart) {
      const productIndex = cart.produk.findIndex(p => p.productID == productID)
      
      if(productIndex === -1) {
        cart.produk.push({productID: productID})
      } else {
        cart.produk[productIndex].qty++
      }
      
      cart = await cart.save()
      res.json({
        message: "Product added to cart succesfully",
        cart: cart
      })
    } else {
      const newCart = new CartModel({
        userID: userID,
        produk: [{productID: productID}]
      })
      
      const saved = await newCart.save()
      await UserModel.findByIdAndUpdate(userID, {keranjangId: saved._id})
      res.json({
        message: "Product added to cart succesfully",
        saved: saved
      })
    }
  } catch (error) {
    res.status(500).send({message: error})
  }
}

// mengurangi product quantity in cart
exports.reduceQty = async (req, res) => {
  const {data} = dataToken(req, res)

  try {
    const userID = data._id
    const {productID} = req.params
    
    let cart = await CartModel.findOne({userID: userID})
    
    if(cart) {
      const productIndex = cart.produk.findIndex(p => p.productID == productID)

      if(productIndex !== -1) {
        cart.produk[productIndex].qty > 1 ? cart.produk[productIndex].qty-- : cart.produk.splice(productIndex, 1)
        await cart.save()

        res.send({message: "Product quantity has been reduced"})
      } else {
        res.sendStatus(404)
      }

    } else {
      res.sendStatus(404)
    }
    
  } catch (error) {
    res.status(500).send({message: error})
  }
}

// menghapus semua produk pada cart
exports.emptyCart = async (req, res) => {
  const {data} = dataToken(req, res)
  
  try {
    const userID = data._id
    let cart = await CartModel.findOne({userID: userID})
    cart.produk = []
    await cart.save()
    res.send({message: "Cart has been emptied successfully"})
  } catch (error) {
    res.status(500).send({error: error})
  }
}

// menghapus product dari cart
exports.removeItem = async (req, res) => {
  const {data} = dataToken(req, res)
  const userID = data._id
  const {productID} = req.params
  
  try {
    let cart = await CartModel.findOne({userID: userID})
    const productIndex = cart.produk.findIndex(p => p.productID == productID)
    cart.produk.splice(productIndex, 1)
    await cart.save()
    
    res.send({
      message: "Item has been removed",
      cart: cart
    })
  } catch (error) {
    
  }
}

exports.checkout = async (req, res) => {
  const {data} = dataToken(req, res)
  const userID = data._id

  const {selectedProducts} = req.body

  let cart = await CartModel.findOne({userID: userID})
  let checkoutProducts = selectedProducts.map(select => cart.produk.filter(p => p.productID == select))

  res.send(checkoutProducts)
}