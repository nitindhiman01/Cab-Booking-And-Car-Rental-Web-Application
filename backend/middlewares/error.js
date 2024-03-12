const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
        err = new ErrorHandler(message, 400);
    }

    //Wrong JWT Error
    if(err.name === "JsonWebTokenError"){
        const message = "Json Web Token is invalid. Try again!";
        err = new ErrorHandler(message, 400);
    }

    //Expired JWT Error
    if(err.name === "TokenExpiredError"){
        const message = "Json Web Token is expired. Try again!";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}