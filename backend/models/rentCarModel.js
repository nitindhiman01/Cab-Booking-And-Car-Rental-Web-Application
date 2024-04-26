const mongoose = require("mongoose");
const validator = require("validator");

const rentCarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the car name."],
        minLength: [6, "Car name should be at least 6 characters."],
    },
    model: {
        type: Number,
        required: [true, "Please Enter the car model."],
    },
    category: {
        type: String,
        required: [true, "Please provide the category of the car."]
    },
    transmission: {
        type: String,
        required: [true, "Please provide the car transmission."],
        minLength: [6, "Transmission type should be of at least 6 characters."]
        //select from 2 values
    },
    price: {
        type: Number,
        required: [true, "Please enter Car price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    fueltype: {
        type: String,
        required: [true, "Please enter the fuel type."],
        //Fuel type will be selected from 5 values
    },
    occupancy: {
        type: Number,
        required: [true, "Please provide the maximum occupancy."],
        min: [4, "Max occupancy should be atleast 4."],
    },
    plate_number: {
        type: String,
        unique: true,
        required: [true, "Please provide the plate number of the car."],
        minLength: [8, "Plate number should be at least 8 characters"],
        uppercase: true,
    },
    num_trips: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true
            },
        },
    ],
});

module.exports = mongoose.model("RentCar", rentCarSchema);