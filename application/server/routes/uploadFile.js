var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var mediaDirectory = path.join(__dirname, '../media/raw');

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

router.post('/upload', (req, res) => {
  fs.readdir(mediaDirectory, (err, files) => {
    var fileStringList = [];
    for (let x = 0; x < files.length; x++) {
      fileStringList.push(files[x].substr(0, files[x].indexOf('.')));
    }

    var file = req.files.file;
    var fileExtension = file.name.substr(file.name.indexOf('.'));

    var dateString = (new Date()).toISOString();
    dateString = dateString.substr(0, dateString.indexOf('T')) + ":";

    var fileNumber = 0;
    while (fileStringList.indexOf(dateString + fileNumber) != -1) {
      fileNumber += 1;
    }

    file.mv('./media/raw/' + dateString + fileNumber + fileExtension, (err) => {
      res.send('File uploaded!');
    });
  });
});

module.exports = router;