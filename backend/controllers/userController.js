const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchASyncErrors = require("../middlewares/catchASyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");


//Register a User
exports.registerUser = catchASyncErrors(async(req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id: "samplePublicID",
            url: "ProfilePictureURL",
        },
    });

    sendToken(user, 201, res);
});

//Login user
exports.loginUser = catchASyncErrors(async(req, res, next) => {
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or Password", 401));
    }

    sendToken(user, 200, res);
});

//Logout User
exports.logoutUser = catchASyncErrors(async(req, res, next) => {
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
exports.forgotPassword = catchASyncErrors(async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found.", 404));
    }

    //Get the password token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your Password reset token is :- \n\n ${resetPasswordURL} \n\nIf you have not requested this then just ignore it.`;

    try {
        
        await sendEmail({
            email: user.email,
            subject: "Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `E-mail sent to ${user.email} successfully.`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500))
    }
});

//Reset Password
exports.resetPassword = catchASyncErrors(async(req, res, next) => {
    //Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now() }});

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or expired.", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does'nt match.", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Get User Details
exports.getUserDetails = catchASyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//Update the user Password
exports.updatePassword = catchASyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect.", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does'nt match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
});

//Update the user profile
exports.updateProfile = catchASyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    //adding cloudinary later for avatar

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

//Get all the Users - (admin)
exports.getAllUsers = catchASyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

//Get a single User - (admin)
exports.getSingleUser = catchASyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

//Update user profile including role -- ADMIN
exports.updateProfileAdmin = catchASyncErrors(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

//Delete a user -- ADMIN
exports.deleteUser = catchASyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    //Will remove the cloudinary later.

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully."
    });
});