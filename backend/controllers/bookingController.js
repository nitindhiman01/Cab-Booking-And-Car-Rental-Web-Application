const ErrorHandler = require("../utils/errorHandler");
const catchASyncErrors = require("../middlewares/catchASyncErrors");
const Booking = require("../models/bookingModel");

//New booking
exports.newBooking = catchASyncErrors(async(req,res,next) => {
    const {location, package, car, user} = req.body;

    const booking = await Booking.create({
        location,
        package,
        car,
        user,
    });

    res.status(201).json({
        success: true,
        booking,
    });
});

//get Single Booking
exports.getSingleBooking = catchASyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!booking) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      booking,
    });
  });
  
  // get logged in user  Orders
  exports.myBookings = catchASyncErrors(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.body.userid });
  
    res.status(200).json({
      success: true,
      bookings,
    });
  });

  //Get all bookings -- ADMIN
  exports.getAllBookings = catchASyncErrors(async (req, res, next) => {
    const adminbookings = await Booking.find();
  
    res.status(200).json({
      success: true,
      adminbookings,
    });
  });

  //Delete Booking -- ADMIN
  exports.deleteBooking = catchASyncErrors(async(req, res, next) => {
    let booking = await Booking.findById(req.params.id);

    if(!booking){
        return next(new ErrorHandler(`No such booking exists with the ID: ${req.params.id}`, 404));
    }

    await booking.deleteOne();

    res.status(200).json({
        success: true,
        message: "Booking Deleted Successfully."
    });
  })
  

