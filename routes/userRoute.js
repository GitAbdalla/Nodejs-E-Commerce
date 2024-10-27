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
} = require("../utils/validators/userValidator");


const router = express.Router();

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
router.put("/changePassword/:id", changeUserPassword)
router.delete("/:id", deleteUserValidator, deleteUser);

module.exports = router;
