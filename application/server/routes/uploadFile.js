var mediaManager = require('../database/media-manager.js');
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

var mediaRawDirectory = path.join(__dirname, '../media/raw');

router.get('/upload', checkAuthUser, (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

function checkAuthUser(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.user !== undefined) {
      return next();
    }
  }
  res.redirect('/login');
}

router.post('/upload', (req, res) => {
  if(!req.isAuthenticated()) {
    res.redirect('/register')
  }

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
      let previewExtension = preview.name.substr(preview.name.indexOf('.'));
      previewPath = "preview/" + dateString + fileNumber + previewExtension;
    }

    let rawPath = "raw/" + dateString + fileNumber + fileExtension;

    file.mv('./media/' + rawPath, (err) => {
      if (previewPath.substr(0, 8) == "preview/") {
        preview.mv('./media/' + previewPath, (err) => {
          mediaManager.addMedia(req.user.id, title, description, previewPath, rawPath, category);
          res.status(200);
          res.send({success: "true"});
        });
      }
      else {
        mediaManager.addMedia(req.user.id, title, description, previewPath, rawPath, category);
        res.status(200);
        res.send({success: "true"});
      }
    });
  });
});

module.exports = router;