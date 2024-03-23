const ErrorHandler = require("../utils/errorHandler");
const catchASyncErrors = require("../middlewares/catchASyncErrors");
const RentCar = require("../models/rentCarModel");

//Registering a car -- ADMIN
exports.registerCar = catchASyncErrors(async(req, res, next) => {
    const rentCar = await RentCar.create(req.body);

    res.status(200).json({
        success: true,
        message: "Car registered Successfully."
    });
});

//Get all the car details
exports.getAllRentCars = catchASyncErrors(async(req, res, next) => {
    const rentCars = await RentCar.find()

    res.status(200).json({
        success: true,
        rentCars,
    });
});

//Get a single car
exports.getSingleRentCar = catchASyncErrors(async(req, res, next) => {
    const requestedRentCar = await RentCar.findById(req.params.id);

    if(!requestedRentCar){
        return next(new ErrorHandler(`No such car exists with the ID: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        requestedRentCar,
    });
});

//Update the car -- ADMIN
exports.updateRentCar = catchASyncErrors(async(req, res, next) => {
    let car = await RentCar.findById(req.params.id);

    if(!car){
        return next(new ErrorHandler(`No such car exists with the ID: ${req.params.id}`, 404));
    }

    car = await RentCar.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    });

    res.status(200).json({
        success: true,
        car
    });
});

//Delete the car -- ADMIN
exports.deleteRentCar = catchASyncErrors(async(req, res, next) => {
    let car = await RentCar.findById(req.params.id);

    if(!car){
        return next(new ErrorHandler(`No such car exists with the ID: ${req.params.id}`, 404));
    }

    car = await RentCar.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Car Deleted Successfully."
    });
});