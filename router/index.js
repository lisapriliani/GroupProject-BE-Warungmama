const express = require("express")
const testRoutes = require("./test")
const router = express.Router()

router.use("/", testRoutes)

module.exports = router