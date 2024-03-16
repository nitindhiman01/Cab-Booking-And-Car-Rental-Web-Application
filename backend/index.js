const app = require("./App");
const connectDatabase = require("./config/database");


//Connecting to database
connectDatabase();


app.listen(3000, () => {
    console.log("Server is running at port 3000.");
});