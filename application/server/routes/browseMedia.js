var mediaManager = require('../database/media-manager.js');
var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.get('/browse', (req, res, next) => {
  mediaManager.getMediaApproved(25, 0, (results) => {
    results.forEach((result, idx) => {
        userManager.getUserFromID(result.author_id, (user) => {
          result["author_username"] = user[0].username;

          if (idx == results.length - 1) {
            res.render('browse', {results: results});
          }
        });
      });
  });
});

module.exports = router;
