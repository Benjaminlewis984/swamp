const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

// Only admins can ban
router.get('/ban', passport_config.checkAuth, passport_config.checkAdmin, (req, res, next) => {
  res.render('ban');
});

router.post('/ban', (req, res, next) => {
  let username = req.body.username;
  userManager.getUserFromUsername(username, (user) => {
    if(user == undefined) {
      res.status(400).send({success: "false"});
    } else {
      userManager.checkUserBanned(user, (result) => {
        if(result != undefined) {
          userManager.banUser(user, req.user.admin_id, req.body.reason, parseInt(req.body.ban_length));
          res.status(200).send({success: "true"});
        } else {
          res.status(400).send({success: "false"});
        }
      });
    }
  });
});

module.exports = router;
