const express = require("express");
const { checkout } = require("../controllers/paymentController");

const router = express.Router();

router.route("/checkout").post(checkout);

module.exports = router;