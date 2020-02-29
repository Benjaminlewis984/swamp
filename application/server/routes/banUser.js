var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.get('/ban', checkAuthAdmin, (req, res, next) => {
  res.render('ban');
});

router.post('/ban', (req, res, next) => {
  let username = req.body.username;
  if(req.user.privilege == 'admin') {
    userManager.getUserFromUsername(username, (usernameResult) => {
      if(usernameResult != undefined && usernameResult[0]['privilege'] == 'user') {
        userManager.updateUserPrivilege(username, "banned");
        console.log('banned user');
        res.redirect('/')
      } else {
        res.send("Failed to ban user");
      }
    })
  } else {
    console.log('failed');
    res.redirect('/');
  }
});
/**
 * Checks if user is already authenticated.
 * If so, redirect to homepage, otherwise next
 */
function checkAuthAdmin(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.user.privilege == 'admin') {
      return next();
    }
  }
  res.redirect('/login');
}

module.exports = router;
