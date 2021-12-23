const express = require("express");
const wishlistcontroller = require("../controller/wishlist");
const router = express.Router();

router.get("/", wishlistcontroller.getWishlist);
router.post("/post", wishlistcontroller.postWishlist);
router.delete("/hapuswishlist", wishlistcontroller.deleteWishlist);

module.exports = router;
