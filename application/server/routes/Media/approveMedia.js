const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js')

/**
 * Selects all the media content that is pending for approval and renders it
 * on the /approve page.
 * @return: Returns all media content pending for approval
 */
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

/**
 * Changes the status of media content from 'pending' to 'approved'
 * Inserts the media content into the approved table of the database
 * @param req.body.id: The m_id of the media content
 * @param req.user.admin_id: The admin_id of the admin
 * @return: "true" if media is successfully approved.
 */
router.post('/approve', async (req, res, next) => {
  await mediaManager.approveMedia(req.body.id, req.user.admin_id);
  return res.status(200).send({success: "true"});
});

/**
 * Changes the status of media content from 'pending' to 'rejected'
 * Inserts the media content into the rejected table of the database
 * @param req.body.id: The m_id of the media content
 * @param req.user.admin_id: The admin_id of the admin
 * @return: "true" if media is successfully rejected.
 */
router.post('/reject', async (req, res, next) => {
  await mediaManager.rejectMedia(req.body.id, req.user.admin_id);
  return res.status(400).send({success: "true"});
});

module.exports = router;
