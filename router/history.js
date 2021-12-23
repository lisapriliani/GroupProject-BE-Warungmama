const express = require("express")

const historyController = require("../controller/history.controller")

const router = express.Router()

const {verifyToken, allowedAdmin, allowedUser} = require("../helpers")


router.get("/", [verifyToken], historyController.viewHistory)
router.patch("/edit/:id", [verifyToken],historyController.editHistory)


module.exports = router