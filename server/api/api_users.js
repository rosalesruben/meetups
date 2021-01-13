var express = require("express");
var router = express.Router();
var User = require("../model/User");
var Meetup = require("../model/Meetup");
const passport = require("passport");

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
 *     summary: Create a new user.
 *     consumes:
 *     - application/json
 *     produces:
 *     - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/NewUser"
 *     responses:
 *       200:
 *         description: User created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/User"
 * definitions:
 *  NewUser:
 *   type: "object"
 *   properties:
 *    name:
 *     type: "string"
 *     example: "nombre1"
 *    lastname:
 *     type: "string"
 *     example: "apellido1"
 *    username:
 *     type: "string"
 *     example: "usuario1"
 *    password:
 *     type: "string"
 *     example: "123"
 *    role:
 *     type: "string"
 *     example: "USER"
 *   xml:
 *    name: "NewUser"
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
 *     security:
 *       - bearerAuth: []
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
 *         $ref: '#/definitions/User'
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
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
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find((error, response) => {
      if (error) {
        res.error(error);
      } else {
        res.send(response);
      }
    });
  }
);

/**
 * @swagger
 *
 * /api/users/{id}:
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
 *         $ref: '#/definitions/User'
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
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response);
      }
    });
  }
);

/**
 * @swagger
 *
 * /api/users/{id}/meetups:
 *   get:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of User to return."
 *         required: true
 *         type: "string"
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
 *     type: "date"
 *    organizer:
 *     type: "string"
 *    location:
 *     type: "string"
 *   xml:
 *    name: "Meetup"
 */
router.get(
  "/:id/meetups",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userID = req.params.id;
    Meetup.find({ attenders: userID }, (error, response) => {
      if (error) {
        console.log(error);
      } else {
        res.send(response);
      }
    });
  }
);

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

/**
 * @swagger
 *
 * /api/users/{id}:
 *   patch:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/User"   
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of User to return."
 *         required: true
 *         type: "string"
 *     responses:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *         $ref: '#/definitions/User'
 */

// Si o si tiene que venir el ID en el body sino mongo no lo puede actualizar
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
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
  }
);

/**
 * @swagger
 *
 * /api/users/{id}:
 *   delete:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of Meetup to delete."
 *         required: true
 *         type: "string"
 *     responses:
 *      "200":
 *       description: "successfull operation"
 *       schema:
 *         $ref: '#/definitions/User'
 * definitions:
 *  User:
 *   type: "object"
 *   properties:
 *    _id:
 *     type: "string"
 *     example: "123123"
 *    name:
 *     type: "string"
 *     example: "nombre01"
 *    lastname:
 *     type: "string"
 *     example: "apellido01"
 *    username:
 *     type: "string"
 *     example: "username01"
 *    password:
 *     type: "string"
 *     example: "123"
 *    role:
 *     type: "string"
 *     example: "USER"
 *   xml:
 *    name: "User"
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    User.findByIdAndDelete({ _id: req.params.id }, (error, response) => {
      res.send(response);
    });
  }
);

module.exports = router;
