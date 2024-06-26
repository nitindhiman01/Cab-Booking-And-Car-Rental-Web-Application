const express = require("express");
const { authorizeRoles, isAuthenticatedUser } = require("../middlewares/auth");
const { newBooking, getSingleBooking, myBookings, getAllBookings, deleteBooking } = require("../controllers/bookingController");

const router = express.Router();

router.route("/rent/newbooking").post(newBooking);
router.route("/rent/booking/:id").get(isAuthenticatedUser, getSingleBooking);
router.route("/rent/bookings/me").post(myBookings);
router.route("/admin/rent/allbookings").post(authorizeRoles("admin"), getAllBookings);
router.route("/admin/deletebooking/:id").delete(deleteBooking);

module.exports = router;