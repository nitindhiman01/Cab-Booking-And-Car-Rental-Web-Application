const Driver = require("../models/driverModel");
const ErrorHandler = require("../utils/errorHandler");
const catchASyncErrors = require("../middlewares/catchASyncErrors");
const sendDriverToken = require("../utils/driverJwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//Register a Driver
exports.registerDriver = catchASyncErrors(async(req, res, next) => {

    

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const {name, email, password, carName, plate_no, car_category} = req.body;

    const driver = await Driver.create({
        name,
        email,
        password,
        avatar : {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        carName,
        plate_no,
        car_category,
    });

    sendDriverToken(driver, 200, res);
});

//Driver Login
exports.loginDriver = catchASyncErrors(async(req, res, next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    const driver = await Driver.findOne({email}).select("+password");

    if(!driver){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await driver.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or Password", 401));
    }

    sendDriverToken(driver, 200, res);
});

//Logout Driver
exports.logoutDriver = catchASyncErrors(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});

//Forgot Password and sending email to the user
exports.forgotDriverPassword = catchASyncErrors(async(req, res, next) => {
    const driver = await Driver.findOne({email: req.body.email});

    if(!driver){
        return next(new ErrorHandler("Driver not found.", 404));
    }

    //Get the password token
    const resetToken = driver.getResetPasswordToken();

    await driver.save({validateBeforeSave : false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    console.log(resetPasswordURL);

    const message = `Your Password reset token is :- \n\n ${resetPasswordURL} \n\nIf you have not requested this then just ignore it.`;

    try {
        
        await sendEmail({
            email: driver.email,
            subject: "Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `E-mail sent to ${driver.email} successfully.`
        });

    } catch (error) {
        driver.resetPasswordToken = undefined;
        driver.resetPasswordExpire = undefined;

        await driver.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))
    }
});

//Reset Password
exports.resetDriverPassword = catchASyncErrors(async(req, res, next) => {
    //Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const driver = await Driver.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }});

    if(!driver){
        return next(new ErrorHandler("Reset Password Token is invalid or expired.", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does'nt match.", 400));
    }

    driver.password = req.body.password;
    driver.resetPasswordToken = undefined;
    driver.resetPasswordExpire = undefined;

    await driver.save();

    sendDriverToken(driver, 200, res);
});

//Get Driver Details
exports.getDriverDetails = catchASyncErrors(async(req, res, next) => {
    const driver = await Driver.findById(req.driver.id);

    res.status(200).json({
        success: true,
        driver,
    });
});

//Update the Driver Password
exports.updateDriverPassword = catchASyncErrors(async(req, res, next) => {
    const driver = await Driver.findById(req.body.driverid).select("+password");

    const isPasswordMatched = await driver.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect.", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does'nt match", 400));
    }

    driver.password = req.body.newPassword;

    await driver.save();

    sendDriverToken(driver, 200, res);
});

//Update the Driver profile
exports.updateDriverProfile = catchASyncErrors(async(req, res, next) => {
    const newDriverData = {
        name: req.body.name,
        email: req.body.email
    };

    const driver = await Driver.findByIdAndUpdate(req.body.driverid, newDriverData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

//Get all the Drivers - (admin)
exports.getAllDrivers = catchASyncErrors(async(req, res, next) => {
    const drivers = await Driver.find();

    res.status(200).json({
        success: true,
        drivers,
    });
});

//Get a single Driver - (admin)
exports.getSingleDriver = catchASyncErrors(async(req, res, next) => {
    const driver = await Driver.findById(req.params.id);

    if(!driver){
        return next(new ErrorHandler(`Driver does not exist with Id : ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        driver,
    });
});

//Update Driver profile including role -- ADMIN
exports.updateDriverProfileAdmin = catchASyncErrors(async(req, res, next) => {
    const newDriverData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const driver = await Driver.findByIdAndUpdate(req.params.id, newDriverData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

//Delete a user -- ADMIN
exports.deleteDriver = catchASyncErrors(async(req, res, next) => {
    const driver = await Driver.findById(req.params.id);

    //Will remove the cloudinary later.

    if(!driver){
        return next(new ErrorHandler(`Driver does not exist with id: ${req.params.id}`, 400));
    }

    await driver.deleteOne();

    res.status(200).json({
        success: true,
        message: "Driver Deleted Successfully."
    });
});


