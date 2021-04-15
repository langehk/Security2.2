var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  let loggedin = false; 
  if(req.isAuthenticated()){
    loggedin = true;
  }
  res.render('index', { title: 'Express', loggedin});
  console.log(req.session);
});

module.exports = router;
