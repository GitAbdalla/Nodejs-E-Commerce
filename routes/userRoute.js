const express = require("express");
const {
  getusers,
  getUser,
  uploadUserImage,
  resizeImage,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../controllers/userController");
const {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", getusers);
router.get("/:id", getUserValidator, getUser);
router.post(
  "/",
  authController.protect,
  authController.allowedTo("admin"),
  uploadUserImage,
  resizeImage,
  createUserValidator,
  createUser
);
router.put(
  "/:id",
  authController.protect,
  authController.allowedTo("admin"),
  uploadUserImage,
  resizeImage,
  updateUserValidator,
  updateUser
);
router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
router.delete(
  "/:id",
  authController.protect,
  authController.allowedTo("admin"),
  deleteUserValidator,
  deleteUser
);

module.exports = router;
