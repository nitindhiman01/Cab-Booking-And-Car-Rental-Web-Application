const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, "Please Provide the location"]
    },
    package: {
        type: String,
        required: [true, "Please provide the package."]
    },
    car: {
        type: mongoose.Schema.ObjectId,
        ref: "RentCar",
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Booking", bookingSchema);