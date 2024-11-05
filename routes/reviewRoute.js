const express = require("express");

const authController = require("../controllers/authController");

const { getReviews, getReview, createReview, updateReview, deleteReview } = require("../controllers/reviewController");
const { getReviewValidator, createReviewValidator, updateReviewValidator, deleteReviewValidator } = require("../utils/validators/reviewValidator");

const router = express.Router();

router.get('/',getReviews)
router.get('/:id',getReviewValidator , getReview)
router.post('/', authController.protect, authController.allowedTo('user') , createReviewValidator , createReview)
router.put('/:id',authController.protect ,authController.allowedTo('user') , updateReviewValidator ,updateReview)
router.delete('/:id', authController.protect,authController.allowedTo('user','manager','admin') , deleteReviewValidator ,deleteReview)



module.exports = router;
