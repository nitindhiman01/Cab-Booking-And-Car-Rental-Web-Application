const express = require("express");
const cookieparser = require("cookie-parser");

const app = express();

//Importing middleware for errors
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
app.use(cookieparser());

//Route Imports
const userRoute = require("./routes/userRoutes");
const rentCarRoute = require("./routes/rentCarRoutes");

app.use("", userRoute);
app.use("", rentCarRoute);


//Middleware for errors
app.use(errorMiddleware);

module.exports = app