const express = require("express")
// const testRoutes = require("./test")
const router = express.Router()

const productsRouter = require("./products")

// router.use("/", testRoutes)
router.use("/products", productsRouter)

module.exports = router