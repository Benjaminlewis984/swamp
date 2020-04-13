var express = require('express');
var router = express.Router();

var passport = require('passport');
var passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

var request = require('request');

router.get('/login', passport_config.alreadyAuth, (req, res, next) => {
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

module.exports = router;