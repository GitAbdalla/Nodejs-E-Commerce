const express = require("express");

const authController = require("../controllers/authController");
const {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const router = express.Router();

router.use(
  authController.protect,
  authController.allowedTo("admin", "manager")
);

router.post("/", createCoupon);
router.get("/", getCoupons);
router.get("/:id", getCoupon);
router.put("/;id", updateCoupon);
router.delete("/:id", deleteCoupon);

module.exports = router;
