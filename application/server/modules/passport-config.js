const userManager = require('../database/user-manager.js');
const databaseManager = require('../database/database-manager.js');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

/** 
 * First checks if username is in database.
 * Then matches the password from the form to the user's password.
 */
function pp_config(passport) {
  const userAuthentication = async (username, password, done) => {
    const user = await userManager.getUserFromUsername(username);
    if(user == undefined) {
      return done(null, false, { message: "Incorrect username"});
    }
    if(await bcrypt.compare(password, user[0]['password'])) {
      const check = await userManager.checkUserBanned(user);
      if(check != undefined) { return done(null, false, { message: "User is banned"}); }
      else { return done(null, user[0]); }

    } else { return done(null, false, { message: "Incorrect password"}); }
  }

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
async function checkForAdminStatus(req, res, next) {
  const count = await databaseManager.queryDatabase(`SELECT COUNT(username)
    FROM accounts INNER JOIN admins
    ON accounts.acc_id = admins.acc_id
    WHERE accounts.username = ?;`, [req.user.username]);
  if(count[0]['COUNT(username)'] == 1) {
    req.user.privilege = 'admin';
    const admin = await databaseManager.queryDatabase(`SELECT admins.admin_id
      FROM admins INNER JOIN accounts ON admins.acc_id = accounts.acc_id
      WHERE admins.acc_id = (SELECT accounts.acc_id
          FROM accounts
          INNER JOIN admins
          ON accounts.acc_id = admins.acc_id
          WHERE accounts.username = ?);`, [req.user.username]);
    
    req.user.admin_id = admin[0]['admin_id'];
  }
  return next();
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