const express = require("express");

const authController = require("../controllers/authController");

const { getReviews, getReview, createReview, updateReview, deleteReview } = require("../controllers/reviewController");

const router = express.Router();

router.get('/',getReviews)
router.get('/:id',getReview)
router.post('/', authController.protect, authController.allowedTo('user') , createReview)
router.put('/:id',authController.protect ,authController.allowedTo('user') , updateReview)
router.delete('/:id', authController.protect,authController.allowedTo('user','manager','admin') ,deleteReview)



module.exports = router;
