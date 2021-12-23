const express = require("express")

const adminController = require("../controller/admin.controller")

const router = express.Router()

const {verifyToken, verifyTokenWithId, allowedAdmin} = require("../helpers")


router.post("/login", adminController.loginAdmin)
router.post("/profile/edit/:id", [verifyToken,verifyTokenWithId, allowedAdmin], adminController.editProfileAdmin)
router.get("/profile/:id", [verifyToken,verifyTokenWithId, allowedAdmin], adminController.viewProfileAdmin)
router.get("/", allowedAdmin, (req,res)=>{res.send('hello')})


module.exports = router