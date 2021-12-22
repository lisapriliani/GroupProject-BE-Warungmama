
const express = require("express")
const router = express.Router()

const CartController = require("../controller/cart.controller")
const { verifyToken } = require("../helpers")

router.get("/", verifyToken, CartController.getAll)
router.get("/:userID", verifyToken, CartController.getCartByUser)
router.post("/", verifyToken, CartController.addCart)
router.put("/reduceQty/:productID", verifyToken, CartController.reduceQty)
router.delete("/", verifyToken, CartController.emptyCart)
router.delete("/removeItem/:productID", verifyToken, CartController.removeItem)

module.exports = router