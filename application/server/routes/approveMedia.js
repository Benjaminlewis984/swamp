var mediaManager = require('../database/media-manager.js');
var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.get('/approve', checkAuthAdmin, (req, res, next) => {
  mediaManager.getMediaFromStatus("pending", (results) => {
    if(results == undefined) {
      res.send("No media is pending for approval");
    } else {
      results.forEach((result, idx) => {
        userManager.getUserFromID(result.author_id, (user) => {
          result["author_username"] = user[0].username;

          if (idx == results.length - 1) {
            res.render('approve', {results: results});
          }
        });
      });
    }
  });
});

router.post('/approve', (req, res, next) => {
  mediaManager.approveMedia(req.body.id);
  res.redirect('/approve')
});

router.post('/reject', (req, res, next) => {
  mediaManager.rejectMedia(req.body.id);
  res.redirect('/approve')
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
