const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

const path = require('path');

const mediaDirectory = path.join(__dirname, '../media/');

router.post('/download', passport_config.checkAuthAdmin, (req, res, next) => {
  const file = mediaDirectory + req.body.path;
  res.status(200);
  res.download(file);
});

module.exports = router;