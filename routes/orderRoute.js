const express = require("express");

const authController = require("../controllers/authController");
const { createCashOrder, findAllOrders, filterOrderForLoggedUser, findSpecificOrder } = require("../controllers/orderController");

const router = express.Router();



router.post('/:cartId', authController.allowedTo('user'), createCashOrder);
router.get('/:id',  findSpecificOrder)
router.get('/', authController.protect ,authController.allowedTo('user','admin', 'manager') , filterOrderForLoggedUser ,findAllOrders);


module.exports = router;