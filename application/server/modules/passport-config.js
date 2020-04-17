const userManager = require('../database/user-manager.js');
const databaseManager = require('../database/database-manager.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

/** 
 * First checks if username is in database.
 * Then matches the password from the form to the user's password.
 */
function pp_config(passport) {
  var userAuthentication = (username, password, done) => {
    userManager.getUserFromUsername(username, async (usernameResult) => {
      // console.log(usernameResult);
      if(usernameResult[0]['privilege'] == 'banned') {
        return done(null, false, {message: "User is banned"});
      }
      if(usernameResult == undefined) {
        return done(null, false, { message: "Incorrect username"});
      }
      if(await bcrypt.compare(password, usernameResult[0]['password'])) {
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

function checkAuthAdmin(req, res, next) {
  if(req.isAuthenticated()) {
    databaseManager.queryDatabase(`SELECT EXISTS(SELECT username FROM accounts INNER JOIN admins ON accounts.acc_id = admins.acc_id WHERE accounts.username = '${req.user.username}');`, (result) => {
      if(Object.values(result[0])[0] == 1) {
        return next();
      } else {
        res.redirect('/index');
      }
    })
  } else {
    res.redirect('/login');
  }
}

function checkAdmin(req, res, next) {
  if(req.isAuthenticated()) {
    databaseManager.queryDatabase(`SELECT EXISTS(SELECT username FROM accounts INNER JOIN admins ON accounts.acc_id = admins.acc_id WHERE accounts.username = '${req.user.username}');`, (result) => {
      if(Object.values(result[0])[0] == 1) {
        req.user.privilege = 'admin';
        databaseManager.queryDatabase(`SELECT admins.admin_id FROM admins INNER JOIN accounts ON admins.acc_id = accounts.acc_id WHERE admins.acc_id = (SELECT accounts.acc_id FROM accounts INNER JOIN admins ON accounts.acc_id = admins.acc_id WHERE accounts.username = '${req.user.username}');`, (result) => {
          req.user.admin_id = result[0]['admin_id'];
          return next();
        })
      } else {
        return next();
      }
    })
  } else {
    return next();
  }
}

function checkAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

function alreadyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    // console.log(req.user);
    res.redirect('/');
  } else {
    return next();
  }
}

module.exports.pp_config = pp_config;
module.exports.checkAuthAdmin = checkAuthAdmin;
module.exports.checkAuth = checkAuth;
module.exports.checkAdmin = checkAdmin;
module.exports.alreadyAuth = alreadyAuth;