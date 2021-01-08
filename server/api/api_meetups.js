var express = require("express");
var router = express.Router();
var User = require("../model/User");
var Meetup = require("../model/Meetup");

/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters: []
 *     response:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *        %ref: '#/definitions/User'
 * definitions:
 *  User:
 *   type: "object"
 *   properties:
 *    _id:
 *     type: "string"
 *    name:
 *     type: "string"
 *    lastname:
 *     type: "string"
 *    username:
 *     type: "string"
 *    password:
 *     type: "string"
 *    role:
 *     type: "string"
 *    __v:
 *     type: "integer"
 *   xml:
 *    name: "User"
 */
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
      console.log(error);
    } else {
      res.send(response);
    }
  });
});

//  ATTEND MEETUP
// Validations
// - Check meetup exists
// - Check user is not already attending
router.patch("/:id/attend", function (req, res) {
  let attenderID = req.body.attenderId;
  meetupID = req.params.id;

  Meetup.findById(meetupID, (error, meetup) => {
    if (error) {
      return res.status(404).send({
        errorCode: "MEETUP_NOT_FOUND",
        errorMessage: "Meetup id " + meetupID + " not found.",
      });
    } else {
      // Check if already user is attending meetup
      if (meetup.attenders.includes(attenderID)) {
        return res.status(404).send({
          errorCode: "USER_ALREADY_ATTENDING",
          errorMessage:
            "User id " + attenderID + " is already attending meetup.",
        });
      } else {
        meetup.attenders.push(attenderID);
      }

      Meetup.findByIdAndUpdate(
        { _id: meetupID },
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
    }
  });
});

//  CHECK-IN MEETUP
// Validations
// - Check meetup exists
// - Check user is not already registered
router.patch("/:id/check-in", function (req, res) {
  let attenderID = req.body.attenderId;
  meetupID = req.params.id;

  Meetup.findById(meetupID, (error, meetup) => {
    if (error) {
      return res.status(404).send({
        errorCode: "MEETUP_NOT_FOUND",
        errorMessage: "Meetup id " + meetupID + " not found.",
      });
    } else {
      // Check if already user is registered in the meetup
      if (meetup.registered.includes(attenderID)) {
        return res.status(404).send({
          errorCode: "USER_ALREADY_REGISTERED",
          errorMessage:
            "User id " + attenderID + " is already registered in the meetup.",
        });
      } else {
        meetup.registered.push(attenderID);
      }

      Meetup.findByIdAndUpdate(
        { _id: meetupID },
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
