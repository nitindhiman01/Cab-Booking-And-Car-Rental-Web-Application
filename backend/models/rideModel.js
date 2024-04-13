const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    date: {
        
    }
})