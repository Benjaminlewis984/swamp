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
      if(usernameResult == undefined) {
        return done(null, false, { message: "Incorrect username"});
      }
      if(await bcrypt.compare(password, usernameResult[0]['password'])) {
        userManager.checkUserBanned(usernameResult, (result) => {
          if(result == undefined) {
            return done(null, false, { message: "User is banned"});
          } else {
            return done(null, usernameResult[0]);
          }
        });
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
/**
 * Checks if the account privilege
 * To be used in conjuction with checkAuth
 * If admin, move on to the next middleware
 * Else, queries database to determine is account is an admin
 * If so, move on to the next middleware
 * Else, redirects to homepage
 */
function checkForAdminStatus(req, res, next) {
  databaseManager.queryDatabase(`SELECT EXISTS(SELECT username FROM accounts INNER JOIN admins ON accounts.acc_id = admins.acc_id WHERE accounts.username = ?);`, [req.user.username], (result) => {
    if(Object.values(result[0])[0] == 1) {
      req.user.privilege = 'admin';
      databaseManager.queryDatabase(`SELECT admins.admin_id FROM admins INNER JOIN accounts ON admins.acc_id = accounts.acc_id WHERE admins.acc_id = (SELECT accounts.acc_id FROM accounts INNER JOIN admins ON accounts.acc_id = admins.acc_id WHERE accounts.username = ?);`, [req.user.username], (result) => {
        req.user.admin_id = result[0]['admin_id'];
        return next();
      })
    } else {
      return next();
    }
  });
}
/**
 *  Checks if account is admin
 *  If so, move on to the next middleware
 *  Else, redirect to homepage
*/
function checkAdmin(req, res, next) {
  if(req.user.privilege == 'admin') {
    return next();
  } else {
    return res.status(401).send({success: "false"});
  }
}

/**
 * Checks if the client has not logged in
 * If so, move on to the next middleware
 * Else, redirects to register
 */
function checkAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).send({success: "false"})
  }
}
/**
 * Checks if client has already logged in
 * If so, redirects to homepage
 * Else, moves on to the next middleware 
 */
function alreadyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    // console.log(req.user);
    return res.status(401).send({success: "false"});
  } else {
    return next();
  }
}


/**
 * Checks if the account is not an admin.
 * To be used in conjuction with checkAuth
 * If the account is not an admin, move on to the next middleware
 * Else, redirects to homepage. 
 */

function checkUser(req, res, next) {
  if(req.user.privilege == 'admin') {
    return res.status(401).send({success: "false"});
  } else {
    return next();
  }
}

module.exports.pp_config = pp_config;
module.exports.checkAuth = checkAuth;
module.exports.checkForAdminStatus = checkForAdminStatus;
module.exports.checkAdmin = checkAdmin;
module.exports.alreadyAuth = alreadyAuth;
module.exports.checkUser = checkUser;