var userManager = require('../database/user-manager.js');
var LocalStrategy = require('passport-local').Strategy;


/** 
 * First checks if username is in database.
 * Then matches the password from the form to the user's password.
 */
function pp_config(passport) {
  var userAuthentication = (username, password, done) => {
    userManager.getUserFromUsername(username, (usernameResult) => {
      console.log(usernameResult);
      if(usernameResult == undefined) {
        return done(null, false, { message: "Incorrect username"});
      }
      if(usernameResult[0]['password'] == password) {
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
  passport.serializeUser((user, done) => { done(null, user); });
  passport.deserializeUser((id, done) => { done(null, id); });
}

module.exports = pp_config;