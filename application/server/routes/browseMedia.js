var mediaManager = require('../database/media-manager.js');
var express = require('express');
var router = express.Router();

router.get('/browse', (req, res, next) => {
  res.render('browse');
});

module.exports = router;
