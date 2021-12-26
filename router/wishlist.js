const express = require("express");
const wishlistcontroller = require("../controller/wishlist");
const { verifyToken, allowedUser } = require("../helpers");
const router = express.Router();

router.get("/", verifyToken,wishlistcontroller.getWishlist);
router.post("/post", [verifyToken, allowedUser],wishlistcontroller.postWishlist);
router.delete("/hapuswishlist", [verifyToken, allowedUser],wishlistcontroller.deleteWishlist);

module.exports = router;
