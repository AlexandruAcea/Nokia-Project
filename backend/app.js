const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user.route");
const mongoose = require("mongoose");
const cors = require("cors");

// Set up mongoose connection

let dev_db_url = "mongodb://alexacea:test123@92.87.91.16:27017/cool";
let mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", user);

let port = 1234;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
