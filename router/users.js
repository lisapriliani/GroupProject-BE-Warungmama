const express = require("express")

const usersController = require("../controller/users.controller")

const router = express.Router()

const {verifyToken, verifyTokenWithId} = require("../helpers")

router.post("/register",usersController.registerUser)
router.post("/login",usersController.loginUser)
router.post("/profile/edit/:id",[verifyToken, verifyTokenWithId], usersController.editProfileUser)
router.get("/profile/:id", [verifyToken, verifyTokenWithId], usersController.profileUser)


module.exports = router