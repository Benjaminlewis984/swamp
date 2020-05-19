const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

/**
 * Renders the ban page for the backend dashboard
 */
router.get('/ban', passport_config.checkAuth, passport_config.checkAdmin, (req, res, next) => {
  res.render('ban');
});

/**
 * Checks current user for admin status because only admins are allowed to ban.
 * Uses the username pass through the body to query the database for the user that is
 * associated with that username. Checks if the user is not already banned.
 * If he's already banned, then there's no need to ban him, otherwise, ban him.
 * 
 * @param req.body.username: Username of the user to be banned
 * @return: "true" or "false" depending on whether the user is successfully banned
 */
router.post('/ban', passport_config.checkAuth, passport_config.checkAdmin, async (req, res) => {
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
