const express = require('express');
const router = express.Router();

const passport = require('passport');
const passport_config = require('../../modules/passport-config');
passport_config.pp_config(passport);

const request = require('request');

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
  
router.post('/login', passport.authenticate('local'), passport_config.checkAdmin, (req, res, next) => {
  res.status(200);
  res.send({success: "true", user: req.user});
});

module.exports = router;