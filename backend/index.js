const { Server } = require("socket.io");
const {createServer} = require('http');
const cors = require('cors');
const cloudinary = require("cloudinary");


const app = require("./App");
const connectDatabase = require("./config/database");
const { isAuthenticatedUser } = require("./middlewares/auth");
const { isAuthenticatedDriver } = require("./middlewares/authDriver");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./utils/errorHandler");

app.use(cors({
    origin:'http://localhost:3001',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

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

server.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});