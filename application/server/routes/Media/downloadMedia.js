const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

const path = require('path');

const mediaDirectory = path.join(__dirname, '../../media/');

// Both users and admins can download
router.post('/download', (req, res) => {
  const file = mediaDirectory + req.body.path;
  return res.status(200).download(file);
});

module.exports = router;