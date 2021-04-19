var express = require('express');
var router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  let loggedin = false; 
  if(req.isAuthenticated()){
    loggedin = true;
  }
  res.render('register', { title: 'Register', loggedin });
});

router.post('/register', function(req, res){
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Validation 
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
})

router.get('/login', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/');
  });

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err) return next(err)
    req.logout();
    res.redirect('/');
  });
  
});


module.exports = router;
