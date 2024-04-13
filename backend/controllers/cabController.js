const catchASyncErrors = require("../middlewares/catchASyncErrors");
const Driver = require("../models/driverModel");
const User = require("../models/userModel");

//Booking a cab
exports.cabBooking = catchASyncErrors(async(req, res, next) => {
    const {location, destination, cabType} = req.body;

    const assigned_driver = await Driver.find({status:"free", car_category: cabType});
    if(assigned_driver){
        res.status(200).json({
            success: true,
            assigned_driver
        });
    }

});