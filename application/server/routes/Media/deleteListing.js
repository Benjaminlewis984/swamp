const mediaManager = require('../../database/media-manager.js');
const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();

router.post('/delete', async (req, res, next) => {
  let accountID = req.body.user.acc_id;
  let mediaID = req.body.m_id;

  const result = await mediaManager.getMedia(mediaID);
  if (result.acc_id == accountID) {
    mediaManager.deleteMedia(mediaID);
  }
});

module.exports = router;