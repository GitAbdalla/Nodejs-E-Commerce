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
  getLoggedUserData,
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

router.get('/getMe',authController.protect,getLoggedUserData,getUser)

// Admin
router.use(authController.protect, authController.allowedTo("admin"));

router.get("/", getusers);
router.get("/:id", getUserValidator, getUser);
router.post("/", uploadUserImage, resizeImage, createUserValidator, createUser);
router.put(
  "/:id",
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
router.delete("/:id", deleteUserValidator, deleteUser);

module.exports = router;
