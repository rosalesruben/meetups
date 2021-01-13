const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const dataBaseConfig = require("./database/db");

// ROUTES
const MeetupsAPI = require("./api/api_meetups");
const UsersAPI = require("./api/api_users");
const AuthAPI = require("./api/api_auth");
const WeatherAPI = require("./api/api_weather");

var morgan = require("morgan");
const passport = require("passport");

//SWAGGER
const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Birras!",
      version: "1.0.0",
      description:
        "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "JSONPlaceholder",
        url: "https://jsonplaceholder.typicode.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Development server",
      },
    ],
  },
  apis: ["./server/api/api*.js"],
};

// AUTH
require("./passport-local");

var app = express();
// Used to logg API request
// app.use(morgan("combined"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

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
app.use("/api/weather", WeatherAPI);

//Swagger
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", AuthAPI);

app.get("*", (req, res) => {
  res.sendFile("/" + path.join(__dirname, "../dist/birras/index.html"));
});
