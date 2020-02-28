var mediaManager = require('../database/media-manager.js');
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var mediaDirectory = path.join(__dirname, '../media/raw');

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

router.post('/upload', (req, res) => {
  let file = req.files.file;
  let preview = req.files.preview;

  let title = req.body.title;
  let description = req.body.description;

  fs.readdir(mediaDirectory, (err, files) => {
    let fileStringList = [];
    for (let x = 0; x < files.length; x++) {
      fileStringList.push(files[x].substr(0, files[x].indexOf('.')));
    }

    let fileExtension = file.name.substr(file.name.indexOf('.'));

    let dateString = (new Date()).toISOString();
    dateString = dateString.substr(0, dateString.indexOf('T')) + ":";

    let fileNumber = 0;
    while (fileStringList.indexOf(dateString + fileNumber) != -1) {
      fileNumber += 1;
    }

    file.mv('./media/raw/' + dateString + fileNumber + fileExtension, (err) => {
      mediaManager.addMedia(title, description, "default/pdf.png", "raw/" + dateString + fileNumber + fileExtension);
      res.send('File uploaded!');
    });
  });
});

module.exports = router;