
const ProductModel = require("../models/products.model")

exports.getAll = async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.send(products)
  } catch (error) {
    res.send({message: error})
  }
}

exports.getByID = async (req, res) => {
  try {
    const ID = req.params.id
    const product = await ProductModel.findById(ID)
    res.send(product)
  } catch (error) {
    res.send({message: error})
  }
}

exports.add = async (req, res) => {
  try {
    const newProduct = req.body
    const product = new ProductModel(newProduct)
    const saved = await product.save()

    res.status(201).json({
      message: "OK",
      product: saved
    })
  } catch (error) {
    res.send({message: error})
  }
}

exports.update = async (req, res) => {
  try {
    const ID = req.params.id
    const updateProduct = req.body

    await ProductModel.updateOne({_id: ID}, updateProduct)

    res.send({message: "Product Updated"})
  } catch (error) {
    res.send({message: error})
  }
}

exports.delete = async (req, res) => {
  try {
    const ID = req.params.id

    await ProductModel.deleteOne({_id: ID})

    res.send({message: "Product Deleted"})
  } catch (error) {
    res.send({message: error})
  }
}
