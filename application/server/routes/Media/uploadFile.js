const mediaManager = require('../../database/media-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

const path = require('path');
const fs = require('fs');

const mediaRawDirectory = path.join(__dirname, '../../media/raw');

// Only users, not admins, can upload
router.get('/upload', passport_config.checkAuth, passport_config.checkUser, (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

router.post('/upload', (req, res) => {
  if(!req.isAuthenticated()) {
    res.redirect('/register')
  }
  
  let file = req.files.file;
  let preview = req.files.preview;

  let price = req.body.price;
  let academic = 0;
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
      previewPath = "preview/default/" + category + ".png";
    }
    else {
      let previewExtension = preview.name.substr(preview.name.indexOf('.'));
      previewPath = "preview/" + dateString + fileNumber + previewExtension;
    }

    let rawPath = "raw/" + dateString + fileNumber + fileExtension;

    file.mv('./media/' + rawPath, (err) => {
      if (previewPath.substr(0, 16) != "preview/default/") {
        preview.mv('./media/' + previewPath, (err) => {
          mediaManager.addMedia(title, description, previewPath, rawPath, category, price, req.user.acc_id, academic);
          res.status(200);
          res.send({success: "true"});
        });
      }
      else {
        mediaManager.addMedia(title, description, previewPath, rawPath, category, price, req.user.acc_id, academic);
        res.status(200);
        res.send({success: "true"});
      }
    });
  });
});

module.exports = router;