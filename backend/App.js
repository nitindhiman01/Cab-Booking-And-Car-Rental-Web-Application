const express = require("express");
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

//Importing middleware for errors
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route Imports
const userRoute = require("./routes/userRoutes");
const rentCarRoute = require("./routes/rentCarRoutes");
const driverRoute = require("./routes/driverRoutes");
const bookingRoute = require("./routes/bookingRoutes");

app.use("", userRoute);
app.use("", rentCarRoute);
app.use("", driverRoute);
app.use("", bookingRoute);


//Middleware for errors
app.use(errorMiddleware);

module.exports = app