
const express = require("express")
const router = express.Router()

const ProductsController = require("../controller/products.controller")
const { verifyToken, allowedAdmin } = require("../helpers")

router.get('/',ProductsController.getAll)
router.get('/:id', ProductsController.getByID)
router.post('/', [verifyToken, allowedAdmin], ProductsController.add)
router.put('/:id',  [verifyToken, allowedAdmin], ProductsController.update)
router.delete('/:id', [verifyToken, allowedAdmin], ProductsController.delete)

module.exports = router