
const express = require("express")
const router = express.Router()

const ProductsController = require("../controller/products.controller")

router.get('/', ProductsController.getAll)
router.get('/:id', ProductsController.getByID)
router.post('/', ProductsController.add)
router.put('/:id', ProductsController.update)
router.delete('/:id', ProductsController.delete)

module.exports = router