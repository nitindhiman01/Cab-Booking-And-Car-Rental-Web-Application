const { Server } = require("socket.io");
const {createServer} = require('http');
const cors = require('cors');

const app = require("./App");
const connectDatabase = require("./config/database");


//Connecting to database
connectDatabase();

//Web Socket
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin:"http://localhost:3001",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(cors({
    origin:"http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
}));

io.on("connection", (socket) => {
    console.log("user Connected: ", socket.id);
    socket.emit("welcome", "Welcome to the server!");
});


server.listen(3000, () => {
    console.log(`Server is running at port ${server.address().port}`);
});