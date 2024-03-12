const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/cabProjectDB", {useNewUrlParser : true}).then((data) => {
        console.log(`Database is connected with the server ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabase