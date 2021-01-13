const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/definitions/Credentials"
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Token"
 * definitions:
 *  Token:
 *   type: object
 *   properties:
 *    token:
 *     type: string
 *     example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmYyOTdkZDAwMmYwNTQ1Y2Y0ZGExM2YiLCJuYW1lIjoiTGVhbiIsImxhc3RuYW1lIjoiTWF6enUiLCJ1c2VybmFtZSI6ImxlYW4iLCJwYXNzd29yZCI6IjEyMzEyMyIsInJvbGUiOiJVU0VSIiwiX192IjowLCJpYXQiOjE2MTA0Mjc0MjIsImV4cCI6MTYxMDQyODMyMn0.ifPIm4eSTkmKACd_fKBTCdEcTKPlP43x-OVBW6eJsFo"
 *   xml:
 *    name: "Token"
 * 
 *  Credentials:
 *   type: "object"
 *   properties:
 *    username:
 *     type: "string"
 *     description: "username"
 *     example: "lean"
 *    password:
 *     type: "string"
 *     description: "password"
 *     example: "123123"
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
      const token = jwt.sign(user, "hackerrank", { expiresIn: "1d" });
      jwt.decode(token);
      return res.json({ token });
    });
  })(req, res);
});

module.exports = router;
