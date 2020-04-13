var express = require('express');
var router = express.Router();

var passport = require('passport');
var passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

router.get('/logout', passport_config.checkAuth, (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    res.status(200);
    res.send({success: "true"});
  });
});

/**
 * Checks if user is already authenticated.
 * If so, redirect to homepage, otherwise next
 */

module.exports = router;