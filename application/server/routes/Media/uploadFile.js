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

router.post('/upload', async (req, res) => {
  //if(!req.isAuthenticated()) {
  //  res.redirect('/register')
  //}

  console.log(req.files);

  const acc_id = req.body.acc_id;

  const file = req.files.file;
  const preview = req.files.preview;
  const price = req.body.price;
  const academic = 0;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const type = req.body.type;

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
          mediaManager.addMedia(title, description, previewPath, rawPath, category, price, acc_id, academic, type);
          return res.status(200).send({success: "true"});
        });
      }
      else {
        mediaManager.addMedia(title, description, previewPath, rawPath, category, price, acc_id, academic, type);
        return res.status(200).send({success: "true"});
      }
    });
  });
});

module.exports = router;

