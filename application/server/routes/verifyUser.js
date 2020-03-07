var express = require('express');
var router = express.Router();

var passport = require('passport');
var pp_config = require('../modules/passport-config');
pp_config(passport);

router.get('/login', alreadyAuth, (req, res, next) => {
  res.render('login', { title: 'Sign in'});
});
  
/**
 * Uses userAuthentication to authenticate user.
 * If user is in database, redirects to home page.
 * Else, redirects to error page.
 */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/error'
}));

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