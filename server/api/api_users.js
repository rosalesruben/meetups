var express = require("express");
var router = express.Router();
var User = require("../model/User");
var Meetup = require("../model/Meetup");

/* TODO */
router.post("/register", (req, res) => {
  let user = new User(req.body);
  user.username = req.body.username.toLowerCase();
  /* SEND EMAIL TO CONFIRM REGISTER */
});


/**
 * @swagger
 *
 * /api/users:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Create new user."
 *         required: true
 *         schema:
 *          $ref: "#/definitions/User"
 * definitions:
 *  User:
 *   type: "object"
 *   properties:
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
 *   xml:
 *    name: "User"
 */
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

//User meetups attended
router.get("/:id/meetups", (req, res) => {
  const userID = req.params.id;
  Meetup.find({attenders: userID}, (error, response) => {
    if (error) {
      console.log(error)
    } else {
      res.send(response);
    }
  });
});

//Is attending meetup
// router.get("/:userID/meetup/:meetupID", (req, res) => {
//   const userID = req.params.userID;
//   const meetupID = req.params.meetupID;


//   Meetup.find({attenders: userID}, (error, response) => {
//     if (error) {
//       console.log(error)
//     } else {
//       res.send(response);
//     }
//   });
// });

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
