const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

const path = require('path');

const mediaDirectory = path.join(__dirname, '../../media/');

/**
 * Downloads the media content stored in a file system.
 * 
 * @param req.body.path: The path to the media content, including its file name
 */
router.post('/download', passport_config.checkAuth, (req, res) => {
  const file = mediaDirectory + req.body.path;
  return res.status(200).download(file);
});

module.exports = router;