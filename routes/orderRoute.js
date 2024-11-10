const express = require("express");

const authController = require("../controllers/authController");
const { createCashOrder, findAllOrders, filterOrderForLoggedUser, findSpecificOrder, updateOrderToPaid, updateOrderToDeliverd } = require("../controllers/orderController");

const router = express.Router();



router.post('/:cartId', authController.allowedTo('user'), createCashOrder);
router.get('/:id',  findSpecificOrder)
router.get('/', authController.protect ,authController.allowedTo('user','admin', 'manager') , filterOrderForLoggedUser ,findAllOrders);
router.put('/:id/pay', authController.protect, authController.allowedTo('admin', 'manager') ,updateOrderToPaid)
router.put('/:id/deliver', authController.protect, authController.allowedTo('admin', 'manager') ,updateOrderToDeliverd)


module.exports = router;