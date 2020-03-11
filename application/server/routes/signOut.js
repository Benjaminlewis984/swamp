var express = require('express');
var router = express.Router();

var passport = require('passport');
var pp_config = require('../modules/passport-config');
pp_config(passport);

router.get('/logout', checkAuth, (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    req.status(200);
    res.send({success: "true"});
  });
});

/**
 * Checks if user is already authenticated.
 * If so, redirect to homepage, otherwise next
 */

function checkAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

module.exports = router;