var express = require("express");
var router = express.Router();
var User = require("../model/User");

/* TODO */
router.post("/register", (req, res) => {
  let user = new User(req.body);
  user.username = req.body.username.toLowerCase();
  /* SEND EMAIL TO CONFIRM REGISTER */
});

router.post("/", (req, res) => {
  let user = new User(req.body);
  user.username = req.body.username.toLowerCase();
  user.save((error, response) => {
    if (error) {
      res.error(error);
    } else {
      res.send(response);
    }
  });
});

router.get("/", (req, res) => {
  User.find((error, response) => {
    if (error) {
      res.error(error);
    } else {
      res.send(response);
    }
  });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      res.send(response);
    }
  });
});

// Si o si tiene que venir el ID en el body sino mongo no lo puede actualizar
router.patch("/:id", function (req, res) {
  let user = new User(req.body);

  User.findByIdAndUpdate(
    { _id: req.params.id },
    user,
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
  User.findByIdAndDelete({ _id: req.params.id }, (error, response) => {
    res.send(response);
  });
});

module.exports = router;
