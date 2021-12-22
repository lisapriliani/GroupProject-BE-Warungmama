
const express = require("express")
const router = express.Router()

const CartController = require("../controller/cart.controller")

router.get("/", CartController.getAll)
router.get("/:userID", CartController.getCartByUser)
router.post("/", CartController.addCart)
router.put("/reduceQty/:productID", CartController.reduceQty)
router.delete("/", CartController.emptyCart)
router.delete("/removeItem/:productID", CartController.removeItem)

module.exports = router