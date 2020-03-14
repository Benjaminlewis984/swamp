var express = require('express');
var router = express.Router();

var passport = require('passport');
var pp_config = require('../modules/passport-config');
pp_config(passport);

var request = require('request');

router.get('/login', alreadyAuth, (req, res, next) => {
  if (req.query.username != undefined) {
    request.post('http://0.0.0.0:3001/login', {json: req.query}, (error, response, body) => {
      res.render('index', { title: 'Database Dashboard', user: body.user });
    });
  }
  else {
    res.render('login', { title: 'Sign in'});
  }
});
  
/**
 * Uses userAuthentication to authenticate user.
 * If user is in database, redirects to home page.
 * Else, redirects to error page.
 */
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.status(200);
  res.send({success: "true", user: req.user});
});

/**
 * Checks if user is already authenticated.
 * If so, redirect to homepage, otherwise next
 */
function alreadyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    // console.log(req.user);
    res.redirect('/');
  } else {
    return next();
  }
}

module.exports = router;