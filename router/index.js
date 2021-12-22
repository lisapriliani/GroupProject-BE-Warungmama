const express = require("express")
// const testRoutes = require("./test")
const router = express.Router()

const productsRouter = require("./products")
const cartRouter = require("./cart")

// router.use("/", testRoutes)
router.use("/products", productsRouter)
router.use("/cart", cartRouter)

module.exports = router