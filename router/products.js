
const express = require("express")
const router = express.Router()

const ProductsController = require("../controller/products.controller")
const { verifyToken } = require("../helpers")

router.get('/',ProductsController.getAll)
router.get('/:id', ProductsController.getByID)
router.post('/', verifyToken, ProductsController.add)
router.put('/:id',  verifyToken, ProductsController.update)
router.delete('/:id', verifyToken, ProductsController.delete)

module.exports = router