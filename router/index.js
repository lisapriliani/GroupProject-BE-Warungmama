const express = require("express")

const userRoutes = require("./users")
const adminRoutes = require("./admin")
const productsRouter = require("./products")
const cartRouter = require("./cart")
const historyRouter = require("./history")

const router = express.Router()
router.use("/users", userRoutes)
router.use("/admin", adminRoutes)
router.use("/history", historyRouter)
router.use("/products", productsRouter)
router.use("/cart", cartRouter)

module.exports = router