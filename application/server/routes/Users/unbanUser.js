const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

/**
 * Renders the ban page for the backend dashboard
 */
router.get('/unban', passport_config.checkAuth, passport_config.checkAdmin, (req, res, next) => {
  res.render('unban');
});

router.post('/unban', passport_config.checkAuth, passport_config.checkAdmin, async (req, res) => {
  const user = await userManager.getUserFromUsername(req.body.username);
  if(user != undefined) {
    const banned = await userManager.checkUserBanned(user);
    if(banned != undefined) {
      await userManager.unbanUser(user);
      return res.status(200).send({success: "true"});
    }
  }

  return res.status(400).send({success: "false"});
});

module.exports = router;
