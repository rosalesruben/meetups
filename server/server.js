const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dataBaseConfig = require("./database/db");

// ROUTES
const MeetupsAPI = require("./api/meetupsAPI");
const UsersAPI = require("./api/users")
const AuthAPI = require("./api/auth");

const passport = require("passport");

// AUTH
require("./passport-local");

var app = express();
// Ver si es necesario para Passport
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = path.join(__dirname, "../dist/birras");
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
mongoose
  .connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected sucessfully ");
    },
    (error) => {
      console.log("Could not connected to database : " + error);
    }
  );

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

//Routes

app.use("/api/meetups", MeetupsAPI);
app.use("/api/users", UsersAPI);
app.use("/auth", AuthAPI);

app.get("*", (req, res) => {
  res.sendFile("/" + path.join(__dirname, "../dist/birras/index.html"));
});
