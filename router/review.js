const express = require("express");
const reviewcontroller = require("../controller/review");
const router = express.Router();

router.get("/", reviewcontroller.getReview);
router.post("/post", reviewcontroller.postReview);
router.patch("/patch/:id", reviewcontroller.patchReview);

module.exports = router;
