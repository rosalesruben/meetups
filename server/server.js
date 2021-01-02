var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");
var dataBaseConfig = require("./database/db");

// ROUTES
var MeetupsAPI = require("./api/meetupsAPI");


var passport = require("passport");

// AUTH
require("./passport-local");
const auth = require("./api/auth");

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
//app.use("/auth", auth);


app.get("*", (req, res) => {
  res.sendFile(
    "/" + path.join(__dirname, "../dist/birras/index.html")
  );
});
