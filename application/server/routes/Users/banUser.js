var userManager = require('../../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.get('/ban', checkAuthAdmin, (req, res, next) => {
  res.render('ban');
});

router.post('/ban', (req, res, next) => {
  let username = req.body.username;
  userManager.getUserFromUsername(username, (usernameResult) => {
    if(usernameResult != undefined && usernameResult[0]['privilege'] == 'user') {
      userManager.updateUserPrivilege(username, "banned");
      res.status(200);
      res.send({success: "true"});
    } else {
      res.status(400);
      res.send({success: "false"});
    }
  });
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
