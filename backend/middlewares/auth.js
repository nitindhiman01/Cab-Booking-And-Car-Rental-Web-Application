const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchASyncErrors = require("./catchASyncErrors");

//To protect the routes from users that are not logged in

exports.isAuthenticatedUser = catchASyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this route.", 401));
    }

    const decodedData = jwt.verify(token, "JKDBAJDFKASDFHLASJDKSADFJBLIAUDGSBKJAKDSJB");

    req.user = await User.findById(decodedData.id);

    next();
});

//Authorizing roles for admin
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this route.`,
                403
            )); 
        }
        next();
    };
}