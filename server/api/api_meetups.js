var express = require("express");
var router = express.Router();
var User = require("../model/User");
var Meetup = require("../model/Meetup");

/**
 * @swagger
 *
 * /api/meetups:
 *   get:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters: []
 *     responses:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/definitions/Meetup'
 * definitions:
 *  Meetup:
 *   type: "object"
 *   properties:
 *    title:
 *     type: "string"
 *    description:
 *     type: "string"
 *    aboutMeetup:
 *     type: "string"
 *    date:
 *     type: "string"
 *    organizer:
 *     type: "string"
 *    location:
 *     type: "string"
 *    attenders:
 *     type: "array"
 *    registered:
 *     type: "array"
 *   xml:
 *    name: "Meetup"
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

/**
 * @swagger
 *
 * /api/meetups:
 *   post:
 *     summary: Create a new meetup.
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/NewMeetup"
 *     responses:
 *       200:
 *         description: Meetup created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Meetup"
 * definitions:
 *  NewMeetup:
 *   type: "object"
 *   properties:
 *    title:
 *     type: "string"
 *     example: "NodeConf 2021 en el Konex!"
 *    description:
 *     type: "string"
 *     example: "Este año volvemos con todo para uno de los eventos mas importante del a comunidad de NodeJS"
 *    aboutMeetup:
 *     type: "string"
 *     example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 *    date:
 *     type: "string"
 *     example: "2021-01-02T00:00:00.000Z"
 *    organizer:
 *     type: "string"
 *     example: "Santander Tecnologia"
 *    location:
 *     type: "string"
 *     example: "Sarmiento 3131, CABA"
 *   xml:
 *    name: "Meetup"
 */
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


/**
 * @swagger
 *
 * /api/meetups/{id}:
 *   get:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of Meetup to return."
 *         required: true
 *         type: "string"
 *     responses:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *         $ref: '#/definitions/Meetup'
 */
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

/**
 * @swagger
 *
 * /api/meetups/{id}/attend:
 *   patch:
 *     description: Attend meetup
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attenderId:
 *                 type: string
 *                 example: "5ff2231a0e5acf3bad1ea5d1"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of Meetup to return."
 *         required: true
 *         type: "string"
 *     responses:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *         $ref: '#/definitions/Meetup'
 */
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


/**
 * @swagger
 *
 * /api/meetups/{id}/check-in:
 *   patch:
 *     description: Check-in meetup
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attenderId:
 *                 type: string
 *                 example: "5ff2231a0e5acf3bad1ea5d1"
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of Meetup to return."
 *         required: true
 *         type: "string"
 *     responses:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *         $ref: '#/definitions/Meetup'
 */
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
