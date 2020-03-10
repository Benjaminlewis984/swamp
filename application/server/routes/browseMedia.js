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

router.post('/browse', (req, res, next) => {
  if (req.body.category == 'all') {
    mediaManager.getMediaApproved(25, 0, (results) => {
      results.forEach((result, idx) => {
        userManager.getUserFromID(result.author_id, (user) => {
          result["author_username"] = user[0].username;

          if (idx == results.length - 1) {
            res.status(200);
            res.send({results: results, category: "all"});
          }
        });
      });
    });
  }
  else {
    mediaManager.getMediaApprovedCategory(25, 0, req.body.category, (results) => {
      results.forEach((result, idx) => {
        userManager.getUserFromID(result.author_id, (user) => {
          result["author_username"] = user[0].username;

          if (idx == results.length - 1) {
            res.status(200);
            res.send({results: results, category: req.body.category});
          }
        });
      });
    });
  }
});

module.exports = router;
