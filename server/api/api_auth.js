const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Autenticacion"
 *         required: true
 *         schema:
 *          $ref: "#/definitions/Credentials"
 * definitions:
 *  Credentials:
 *   type: "object"
 *   properties:
 *    username:
 *     type: "string"
 *    password:
 *     type: "string"
 *   xml:
 *    name: "Credentials"
 */
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "hackerRank");
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
