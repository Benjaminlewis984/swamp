var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

router.get('/login', (req, res, next) => {
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
 * First checks if username is in database.
 * Then matches the password from the form to the user's password.
 */
var userAuthentication = (username, password, done) => {
  userManager.getUserFromUsername(username, (usernameResult) => {
    console.log(usernameResult);
    if(usernameResult == undefined) {
      return done(null, false, { message: "Incorrect username"});
    }
    if(usernameResult[0]['password'] == password) {
      console.log('correct');
      return done(null, usernameResult[0]);
    } else {
      return done(null, false, { message: "Incorrect password"});
    }
  });
};

passport.use(new LocalStrategy({ 
  usernameField: 'username',
  passwordField: 'password'
 }, userAuthentication));
passport.serializeUser((user, done) => { done(null, user) });
passport.deserializeUser((id, done) => { done(nul, id) });

module.exports = router;