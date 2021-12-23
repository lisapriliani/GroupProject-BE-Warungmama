
const express = require("express")
const router = express.Router()

const CartController = require("../controller/cart.controller")
const { verifyToken, allowedUser, allowedAdmin } = require("../helpers")

router.get("/", verifyToken, CartController.getAll)
router.get("/:userID", [verifyToken, allowedAdmin], CartController.getCartByUser)
router.post("/", [verifyToken, allowedUser], CartController.addCart)
router.put("/reduceQty/:productID", [verifyToken, allowedUser], CartController.reduceQty)
router.delete("/", [verifyToken, allowedUser], CartController.emptyCart)
router.delete("/removeItem/:productID", [verifyToken, allowedUser], CartController.removeItem)
router.post("/checkout", [verifyToken, allowedUser], CartController.checkout)

module.exports = router