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
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../controllers/userController");
const {
  createUserValidator,
  updateUserValidator,
  getUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidator");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword",updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

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
