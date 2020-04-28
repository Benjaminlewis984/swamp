const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js')

router.get('/approve', passport_config.checkAuth, passport_config.checkAdmin, async (req, res) => {
  const media = await mediaManager.getMediaFromStatus('pending');
  if(media == undefined) { res.status(200).send("No media is pending for approveal"); }
  else {
    media.forEach(async (result, idx) => {
      const user = await userManager.getUserFromID(result.acc_id);
      result['author_username'] = user[0].username;

      if(idx == media.length - 1) { res.render('approve', {results: media}); }
    });
  }
});

router.post('/approve', async (req, res, next) => {
  await mediaManager.approveMedia(req.body.id, req.user.admin_id);
  return res.status(200).send({success: "true"});
});

router.post('/reject', async (req, res, next) => {
  await mediaManager.rejectMedia(req.body.id, req.user.admin_id);
  return res.status(400).send({success: "true"});
});

module.exports = router;
