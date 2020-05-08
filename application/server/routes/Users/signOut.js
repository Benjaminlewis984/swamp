const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

/**
 * Destroys the cookie in req.session, therefore logging the user out
 * @return: "true"
 */
router.get('/logout', passport_config.checkAuth, (req, res, next) => {
  req.session.destroy((err) => {
    req.logout();
    return res.status(200).send({success: "true"});
  });
});

module.exports = router;