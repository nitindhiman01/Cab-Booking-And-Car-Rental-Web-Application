const { Server } = require("socket.io");
const {createServer} = require('http');
const cors = require('cors');
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");


const app = require("./App");
const connectDatabase = require("./config/database");
const { isAuthenticatedUser } = require("./middlewares/auth");
const { isAuthenticatedDriver } = require("./middlewares/authDriver");
const cookieParser = require("cookie-parser");
const  Razorpay  = require("razorpay");
const ErrorHandler = require("./utils/errorHandler");


//Connecting to database
connectDatabase();

cloudinary.config({
    cloud_name: "drfglluzr",
    api_key: "874143543253342",
    api_secret: "qXZOuQCae2RaZpZQmlu745RFrEQ"
})

//Web Socket
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin:"http://localhost:3001",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

//Razorpay Integration

exports.instance = new Razorpay({
    key_id:"rzp_test_pJzyKZ1Oj6uTnT",
    key_secret: "iAyT6czWVGRCCvbkXHaOMHsUiAyT6czWVGRCCvbkXHaOMHsU",
  });

app.use(cors({
    origin:"http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
}));


// io.use((socket, next) => {
//     cookieParser()(socket.request, socket.request.res, (err) => {
//         if(err){
//             return next(err);
//         }

//         const token = socket.request.cookies.token;

//         if(!token){
//             return next(new Error("auth error"));
//         }

//         const decodedData = jwt.verify(token, "JKDBAJDFKASDFHLASJDKSADFJBLIAUDGSBKJAKDSJB");
//         next();
//     });
// });


io.on("connection", (socket) => {
    console.log("user Connected: ", socket.id);
    socket.emit("welcome", "Welcome to the server!");

    socket.on('triggerRequest', () => {
        socket.broadcast.emit('requestTriggered');
    });

    socket.on("message", (data) => {
        console.log(data);
        io.emit("recieve-message", data);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected.", socket.id);
    })
});

// app.use(cors());



server.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});