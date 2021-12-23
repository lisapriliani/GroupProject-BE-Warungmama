const express = require("express")
const userRoutes = require("./users")
const adminRoutes = require("./admin")

const router = express.Router()
router.use("/users", userRoutes)
router.use("/admin", adminRoutes)


module.exports = router