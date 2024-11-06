const express = require("express");

const authController = require("../controllers/authController");
const { addAddress, deleteAddress, getLoggedUserAddresses } = require("../controllers/addressContrller");


const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router.post("/", addAddress);

router.delete("/:addressId", deleteAddress);

router.get("/", getLoggedUserAddresses);

module.exports = router;
