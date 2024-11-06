const express = require("express");

const authController = require("../controllers/authController");

const { getReviews, getReview, createReview, updateReview, deleteReview, createFilterObj, setProductIdAndUserIdToBody } = require("../controllers/reviewController");
const { getReviewValidator, createReviewValidator, updateReviewValidator, deleteReviewValidator } = require("../utils/validators/reviewValidator");

const router = express.Router({mergeParams: true });

router.get('/', createFilterObj ,getReviews)
router.get('/:id',getReviewValidator , getReview)
router.post('/', authController.protect, authController.allowedTo('user') , setProductIdAndUserIdToBody ,createReviewValidator , createReview)
router.put('/:id',authController.protect ,authController.allowedTo('user') , updateReviewValidator ,updateReview)
router.delete('/:id', authController.protect,authController.allowedTo('user','manager','admin') , deleteReviewValidator ,deleteReview)



module.exports = router;
