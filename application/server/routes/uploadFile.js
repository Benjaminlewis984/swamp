var mediaManager = require('../database/media-manager.js');
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var mediaRawDirectory = path.join(__dirname, '../media/raw');

router.get('/upload', (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

router.post('/upload', (req, res) => {
  let file = req.files.file;
  let preview = req.files.preview;

  let title = req.body.title;
  let description = req.body.description;
  let category = req.body.category;

  fs.readdir(mediaRawDirectory, (err, files) => {
    let fileStringList = [];
    for (let x = 0; x < files.length; x++) {
      fileStringList.push(files[x].substr(0, files[x].indexOf('.')));
    }

    let fileExtension = file.name.substr(file.name.indexOf('.'));
    let previewExtension = preview.name.substr(preview.name.indexOf('.'));

    let dateString = (new Date()).toISOString();
    dateString = dateString.substr(0, dateString.indexOf('T')) + ":";

    let fileNumber = 0;
    while (fileStringList.indexOf(dateString + fileNumber) != -1) {
      fileNumber += 1;
    }

    let previewPath = "";
    if (preview === undefined) {
      previewPath = "default/" + category + ".png";
    }
    else {
      previewPath = "preview/" + dateString + fileNumber + previewExtension;
    }

    let rawPath = "raw/" + dateString + fileNumber + fileExtension;

    file.mv('./media/' + rawPath, (err) => {
      if (previewPath.substr(0, 8) == "preview/") {
        preview.mv('./media/' + previewPath, (err) => {
          mediaManager.addMedia(title, description, previewPath, rawPath, category);
          res.send('File uploaded!');
        });
      }
      else {
        mediaManager.addMedia(title, description, previewPath, rawPath, category);
        res.send('File uploaded!');
      }
    });
  });
});

module.exports = router;