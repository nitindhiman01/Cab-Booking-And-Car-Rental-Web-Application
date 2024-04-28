const express = require("express");
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword, 
    getUserDetails, 
    updatePassword, 
    updateProfile, 
    getAllUsers,
    getSingleUser,
    updateProfileAdmin,
    deleteUser
} = require("../controllers/userController");
const {isAuthenticatedUser, authorizeRoles} = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/account").get(getUserDetails);

router.route("/password/update").put(updatePassword);

router.route("/account/update").put(updateProfile);

router.route("/admin/users").post(authorizeRoles("admin"), getAllUsers);

router
    .route("/admin/user/:id")
    .post(authorizeRoles("admin"), getSingleUser)
    .put(authorizeRoles("admin"), updateProfileAdmin)
    .delete(deleteUser);

module.exports = router