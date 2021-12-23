const express = require("express");
const reviewcontroller = require("../controller/review");
const { verifyToken, allowedUser } = require("../helpers");
const router = express.Router();

router.get("/", [verifyToken, allowedUser], reviewcontroller.getReview);
router.post("/:historyID", [verifyToken, allowedUser], reviewcontroller.postReview);
router.patch("/:id", [verifyToken, allowedUser], reviewcontroller.patchReview);

module.exports = router;
