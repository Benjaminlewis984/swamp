var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

router.post('/upload', (req, res) => {
  var file = req.files.file;

  file.mv('./media/raw/' + file.name, (err) => {
    res.send('File uploaded!');
  });
});

module.exports = router;