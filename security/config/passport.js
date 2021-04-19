const FacebookStrategy = require('passport-facebook').Strategy;

// Load User model
const userModel = require('../model/User');

module.exports = function(passport) {
  passport.use(new FacebookStrategy({
    clientID: "3015782695319609",
    clientSecret: "3dc92e36b50defbabdd76bae6631b97e",
    callbackURL: "http://localhost:3000/users/auth/facebook/callback" //takes user to frontpage when loggedin
  },
  function(accessToken, refreshToken, profile, done) {
    const { name, id } = profile._json;
    //We don't have the need to save our user - and it should be find or save 
    
/*     const userData = {
      _id: id,
      name: name
    };
    console.log(userData);
    new userModel(userData).save(); */
    done(null, profile);
  }
));

  passport.serializeUser(function(user, done) {
    console.log('Serialize: ' + user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function(facebookid, done) {
    userModel.findById(facebookid, function(err, user) {
      done(err, user);
    });
  });
};