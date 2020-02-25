var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var mediaDirectory = path.join(__dirname, '../media/raw');

fs.readdir(mediaDirectory, (err, files) => {
  console.log(files);
});

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

router.post('/upload', (req, res) => {
  var file = req.files.file;

  var date = new Date();

  var dateString = date.toISOString();
  dateString = dateString.substr(0, dateString.indexOf('T'));

  file.mv('./media/raw/' + file.name, (err) => {
    res.send('File uploaded!');
  });
});

module.exports = router;