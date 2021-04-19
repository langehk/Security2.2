const FacebookStrategy = require('passport-facebook').Strategy;

// Load User model
const User = require('../model/User');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID: 3015782695319609,
    clientSecret: "ae59b47a0357c6781fc4ff9bcd783bd7",
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};