const express = require("express")

const adminController = require("../controller/admin.controller")

const router = express.Router()

const {verifyToken, verifyTokenWithId} = require("../helpers")


router.post("/login", adminController.loginAdmin)
router.post("/profile/edit/:id", [verifyToken,verifyTokenWithId], adminController.editProfileAdmin)
router.get("/profile/:id", [verifyToken,verifyTokenWithId], adminController.viewProfileAdmin)


module.exports = router