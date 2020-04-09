var mediaManager = require('../../database/media-manager.js');
var express = require('express');
var router = express.Router();

var path = require('path');

var mediaDirectory = path.join(__dirname, '../media/');

router.post('/download', checkAuthAdmin, (req, res, next) => {
  const file = mediaDirectory + req.body.path;
  res.status(200);
  res.download(file);
});

/**
 * Checks if user is already authenticated.
 * If so, redirect to homepage, otherwise next
 */
function checkAuthAdmin(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.user.privilege == 'admin') {
      return next();
    }
  }
  res.redirect('/login');
}

module.exports = router;