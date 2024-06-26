const express = require("express");
const { 
    registerDriver, 
    loginDriver, 
    logoutDriver, 
    forgotDriverPassword, 
    resetDriverPassword, 
    getDriverDetails, 
    updateDriverPassword, 
    updateDriverProfile, 
    getAllDrivers, 
    getSingleDriver, 
    updateDriverProfileAdmin, 
    deleteDriver 
} = require("../controllers/driverController");
const { isAuthenticatedDriver} = require("../middlewares/authDriver");
const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.route("/driver/register").post(registerDriver);

router.route("/driver/login").post(loginDriver);

router.route("/driver/password/forgot").post(forgotDriverPassword);

router.route("/driver/password/reset/:token").put(resetDriverPassword);

router.route("/driver/logout").get(logoutDriver);

router.route("/driver/account").get(isAuthenticatedDriver ,getDriverDetails);

router.route("/driver/password/update").put(updateDriverPassword);

router.route("/driver/account/update").put(updateDriverProfile);

router.route("/admin/alldrivers").post(authorizeRoles("admin"), getAllDrivers);

router
    .route("/admin/driver/:id")
    .post(authorizeRoles("admin"), getSingleDriver)
    .put(authorizeRoles("admin"), updateDriverProfileAdmin)
    .delete(deleteDriver);

module.exports = router