
const express = require("express")
const router = express.Router()

const CartController = require("../controller/cart.controller")

router.get("/", CartController.getAll)

module.exports = router