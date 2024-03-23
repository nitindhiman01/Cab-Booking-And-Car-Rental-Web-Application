const express = require("express");
const { registerCar, getAllRentCars, getSingleRentCar, updateRentCar, deleteRentCar } = require("../controllers/rentCarController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/rent/admin/registervehicle").post(isAuthenticatedUser, authorizeRoles("admin"), registerCar);

router.route("/rent/allcars").get(getAllRentCars);

router.route("/rent/:id").get(getSingleRentCar);

router.route("/rent/admin/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateRentCar).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRentCar);

module.exports = router
