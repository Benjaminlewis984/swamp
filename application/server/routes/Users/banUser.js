const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

// Only admins can ban
router.get('/ban', passport_config.checkAuth, passport_config.checkAdmin, (req, res, next) => {
  res.render('ban');
});

router.post('/ban', async (req, res) => {
  const user = await userManager.getUserFromUsername(req.body.username);
  if(user != undefined) {
    const banned = await userManager.checkUserBanned(user);
    if(banned == undefined) {
      await userManager.banUser(user, req.user.admin_id, req.body.reason, parseInt(req.body.ban_length));
      return res.status(200).send({success: "true"});
    }
  }

  return res.status(400).send({success: "false"});
});

module.exports = router;
