
const { dataToken } = require("../helpers")
const CartModel = require("../models/cart.model")
const TransactionModel = require("../models/transaction.model")
const UserModel = require("../models/users.model")

exports.getAll = async (req, res) => {
  const {data} = dataToken(req, res)

  try {
    const role = data.role || null
    
    if(role === 'admin') {
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
    res.status(500).send({error: error})
  }
}

exports.checkout = async (req, res) => {
  const {data} = dataToken(req, res)
  const userID = data._id

  const {selectedProducts, alamat, metodePengambilan} = req.body

  let cart = await CartModel.findOne({userID: userID}).populate({
    path: "produk",
    populate: {
      path: "productID",
      select: {harga: 1}
    }
  })
  
  let checkoutProducts = cart.produk.filter(p => {
    return selectedProducts.find(element => element == p.productID._id)
  })
  
  if(checkoutProducts.length === 0)
  return res.sendStatus(400)
  
  
  let produk = checkoutProducts.map(p => {
    let item = {}
    item.productID = p.productID._id
    item.qty = p.qty
    item.itemPrice = p.productID.harga * p.qty
    
    return item
  })
  
  let totalOngkir = 0
  if(metodePengambilan === 'delivery')
  totalOngkir = 10000
  
  let totalPrice = produk.reduce((prev, curr) => {return prev + curr.itemPrice}, 0)

  let transaction = {
    keranjangID: cart._id,
    produk: produk,
    alamat: alamat || null,
    metodePengambilan: metodePengambilan,
    totalOngkir: totalOngkir,
    totalPrice: totalPrice
  }
  let saved = null
  const transactionCollection = await TransactionModel.findOne({keranjangID: cart._id})
  if(transactionCollection){
    await transactionCollection.update(transaction)
    saved = transaction
  }
  else {
    const newTransaction = new TransactionModel(transaction)
    saved = await newTransaction.save()
  }
  
  res.send(saved)
}

exports.order = async (req, res) => {
  const {data} = dataToken(req, res)
  
  let cart = await CartModel.findOne({userID: data._id})
  let transaction = await TransactionModel.findOne({keranjangID: cart._id})

  let deleteProduct = []

  if(transaction) {
    transaction.produk.map(t => deleteProduct.push(t.productID.toString()))

    cart = cart.produk.filter(p => {
      return deleteProduct.find(element => element != p.productID)
    })
    await CartModel.findOne({userID: data._id}).updateOne({produk: cart})

  } else {
    return res.sendStatus(400)
  }
  
  res.send({cart, transaction, deleteProduct})
}