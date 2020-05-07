const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

const axios = require('axios');
axios.defaults.withCredentials = true;

/**
 * Renders the login page for the backend dashboard
 */
router.get('/login', passport_config.alreadyAuth, (req, res, next) => {
  if (req.query.username != undefined) {
    axios.post('http://0.0.0.0:3001/login',
      req.query
    )
    .then((response) => {
      res.send({success: "true", user: response.data.user})
    });
  }
  else {
    res.render('login', { title: 'Sign in'});
  }
});

router.get('/auth', async (req, res, next) => {
  if (req.user == undefined) {
    return res.status(200).send({success: "false"});
  }
  else {
    return res.status(200).send({success: "true"});
  }
});

/**
 * Calls the passport authentication middleware, which is configured to
 * query the database for user information to determine the login information's credentials.
 * If so, creates a cookie and stores it in the req.session, else, user is unathourized.
 * Also checks the user if they're an admin or not in the checkForAdminStatus middleware.
 * 
 * @param req.body.username: Username to be logged in. Used in passport.authenticate
 * @param req.body.password: Password to be logged in. Used in passport.authenticate
 * @return: "true" if user is successfully logged in
 */
router.post('/login', passport.authenticate('local'), passport_config.checkForAdminStatus, (req, res, next) => {
  return res.status(200).send({success: "true", user: req.user});
});

module.exports = router;