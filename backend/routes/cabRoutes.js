const express = require("express");
const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");
const { cabBooking } = require("../controllers/cabController");

const router = express.Router();

router.route("/confirm").post(isAuthenticatedUser, cabBooking);

module.exports = router
