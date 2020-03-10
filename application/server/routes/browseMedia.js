var mediaManager = require('../database/media-manager.js');
var express = require('express');
var router = express.Router();

router.get('/browse', (req, res, next) => {
  mediaManager.getMediaApproved(25, 0, (results) => {
    res.render('browse', {results: results});
    console.log(results);
  });
});

module.exports = router;
