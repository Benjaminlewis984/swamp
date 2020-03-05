var mediaManager = require('../database/media-manager.js');
var express = require('express');
var router = express.Router();

router.get('/approve', checkAuthAdmin, (req, res, next) => {
  mediaManager.getMediaFromStatus("pending", (result) => {
    if(result == undefined) {
      res.send("No media is pending for approval");
    } else {
      res.render('approve', {result: result});
    }
  });
});

router.post('/approve', (req, res, next) => {
  
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
