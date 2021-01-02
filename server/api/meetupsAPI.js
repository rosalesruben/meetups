var express = require("express");
var router = express.Router();
var User = require("../model/User");
var Meetup = require("../model/Meetup")

router.get("/", (req, res) => {
  Meetup.find((error, response) => {
    if (error) {
      res.error(error);
    } else {
      res.send(response);
    }
  });
});

router.post("/", (req, res) => {
  let meetup = new Meetup(req.body);
  meetup.save((error, response) => {
    if (error) {
      res.error(error);
    } else {
      res.send(response);
    }
  });
});


router.get("/:id", (req, res) => {
  Meetup.findById(req.params.id, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      res.send(response);
    }
  });
});

// Si o si tiene que venir el ID en el body sino mongo no lo puede actualizar
router.patch("/:id", function (req, res) {
  let meetup = new Meetup(req.body);

  Meetup.findByIdAndUpdate(
    { _id: req.params.id },
    meetup,
    { new: true },
    (error, response) => {
      if (!error) {
        res.send(response);
      } else {
        console.log(error);
      }
    }
  );
});

router.delete("/:id", function (req, res) {
  Meetup.findByIdAndDelete({ _id: req.params.id }, (error, response) => {
    res.send(response);
  });
});

module.exports = router;
