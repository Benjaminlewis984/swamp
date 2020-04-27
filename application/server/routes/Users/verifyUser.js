const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

const request = require('request');

// Can't log in again if you're logged in
router.get('/login', passport_config.alreadyAuth, (req, res, next) => {
  if (req.query.username != undefined) {
    request.post('http://0.0.0.0:3001/login', {json: req.query}, (error, response, body) => {
      res.send({success: "true", user: body.user})
      // res.render('index', { title: 'Database Dashboard', user: body.user });
    });
  }
  else {
    res.render('login', { title: 'Sign in'});
  }
});

router.post('/login', passport.authenticate('local'), passport_config.checkForAdminStatus, (req, res, next) => {
  return res.status(200).send({success: "true", user: req.user});
});

module.exports = router;