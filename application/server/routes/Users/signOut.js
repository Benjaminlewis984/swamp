const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_config = require('../../modules/passport-config');
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