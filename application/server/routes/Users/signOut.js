const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

// Only accounts logged in can log out.
router.get('/logout', passport_config.checkAuth, (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    return res.status(200).send({success: "true"});
  });
});

module.exports = router;