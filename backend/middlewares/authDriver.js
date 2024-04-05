const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const Driver = require("../models/driverModel");
const catchASyncErrors = require("./catchASyncErrors");

//To protect the routes from users that are not logged in

exports.isAuthenticatedDriver = catchASyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this route.", 401));
    }

    const decodedData = jwt.verify(token, "JKDBAJDFKASDFHLASJDKSADFJBLIAUDGSBKJAKDSJB");

    req.driver = await Driver.findById(decodedData.id);

    next();
});