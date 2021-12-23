const express = require("express");
const wishlistrouter = require("./wishlist");
const reviewrouter = require("./review");
const router = express.Router();

router.use("/wishlist", wishlistrouter);
router.use("/review", reviewrouter);
module.exports = router;
