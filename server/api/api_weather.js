var express = require("express");
var router = express.Router();
var request = require("request");

const API_WEATHER_ENDPOINT =
  "https://community-open-weather-map.p.rapidapi.com";

router.get("/current", function (req, res) {
  request({
    uri: `${API_WEATHER_ENDPOINT}/weather?q=Ringuelet,AR&lang=sp&units=metric`,
    method: "GET",
    headers: {
      "x-rapidapi-key": "0X3AoWSp7OmshJ3M6D5nvQLBmhlXp1uXdIjjsnX5AR7KRDkJbz",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  }).pipe(res);
});

module.exports = router;
