const express = require("express");
const reviewcontroller = require("../controller/review");
<<<<<<< HEAD
const router = express.Router();

router.get("/", reviewcontroller.getReview);
router.post("/post", reviewcontroller.postReview);
router.patch("/patch/:id", reviewcontroller.patchReview);
=======
const { verifyToken, allowedUser } = require("../helpers");
const router = express.Router();

router.get("/", [verifyToken, allowedUser], reviewcontroller.getReview);
router.post("/:historyID", [verifyToken, allowedUser], reviewcontroller.postReview);
router.patch("/:id", [verifyToken, allowedUser], reviewcontroller.patchReview);
>>>>>>> f1e9afcba67d14908644450baafacfcd4de5b75f

module.exports = router;
