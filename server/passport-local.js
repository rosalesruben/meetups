const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("./model/User");
const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, done) {
      username = username ? username.toLowerCase() : username;


      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return UserModel.findOne({ username, password })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          }
          return done(null, user.toJSON(), {
            message: "Logged In Successfully",
          });
        })
        .catch((err) => done(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "fandomjuxo",
    },
    function (jwtPayload, cb) {
      //find the user in db if needed

      return cb(null, jwtPayload);

      // return UserModel.findOneById(jwtPayload.id)
      //     .then(user => {
      //         return cb(null, user);
      //     })
      //     .catch(err => {
      //         return cb(err);
      //     });
    }
  )
);
