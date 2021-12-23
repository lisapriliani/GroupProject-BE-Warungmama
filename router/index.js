<<<<<<< HEAD
const express = require("express");
const wishlistrouter = require("./wishlist");
const reviewrouter = require("./review");
const router = express.Router();

router.use("/wishlist", wishlistrouter);
router.use("/review", reviewrouter);
module.exports = router;
=======
const express = require("express")

const userRoutes = require("./users")
const adminRoutes = require("./admin")
const productsRouter = require("./products")
const cartRouter = require("./cart")

const router = express.Router()
router.use("/users", userRoutes)
router.use("/admin", adminRoutes)


router.use("/products", productsRouter)
router.use("/cart", cartRouter)

module.exports = router
>>>>>>> 7dffdf8f87d998f32b933853ef8a981ea337a10f
