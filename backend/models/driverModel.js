const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name."],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have atleast 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the email."],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email."]
    },
    password: {
        type: String,
        required: [true, "Please Enter the Password."],
        minLength: [8, "Password should have atleast 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "driver",
    },
    carName: {
        type: String,
        required: [true, "Please provide the name of the car."],
    },
    plate_no: {
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
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            },
        },
    ],
    car_category: {
        type: String,
        required: [true, "Please provide the car category."]
    },
    status: {
        type: String,
        default: "free"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date, 
});

//Hashing the password to protect user privacy
driverSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10); 
});

//JWT Token
driverSchema.methods.getJWTToken = function (){
    return jwt.sign({id : this._id}, "JKDBAJDFKASDFHLASJDKSADFJBLIAUDGSBKJAKDSJB", {
        expiresIn : "5d",
    });
};

//Comparing the user entered password
driverSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Generating the Password Reset Token
driverSchema.methods.getResetPasswordToken = function() {
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding reset password token in to the user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}



module.exports = mongoose.model("Driver", driverSchema);