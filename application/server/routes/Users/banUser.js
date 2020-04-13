const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

router.get('/ban', passport_config.checkAuthAdmin, (req, res, next) => {
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

module.exports = router;
