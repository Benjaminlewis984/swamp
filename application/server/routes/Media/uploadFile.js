const mediaManager = require('../../database/media-manager.js');
const express = require('express');
const router = express.Router();
const passport_config = require('../../modules/passport-config.js');

const path = require('path');
const fs = require('fs');

const mediaRawDirectory = path.join(__dirname, '../../media/raw');

/**
 * Renders the upload page onto the backend dashboard
 */
router.get('/upload', passport_config.checkAuth, passport_config.checkUser, (req, res, next) => {
  res.render('upload', { title: 'Upload file' });
});

/**
 * Inserts into the database all the necessary information extracted from the forms in the front end.
 * In addition, the file itself is stored into the 'raw' directory as a file.
 * If there was no preview selected, then the preview path is defaulted to one of four images.
 * 
 * @param file: The uploaded file itself
 * @param preview: If uploaded, the preview image. Can be null
 * @param price: Price of the media content
 * @param academic: Whether the uploaded media content is used for academic purposes. i.e. homework
 * @param title: Title of the uploaded media content
 * @param description: Description of the uploaded media content
 * @param category: Category of the uploaded media content. i.e. Video, Audio, Document, Image
 * @param type: Type of content. i.e. Physical or Digital. Defaults to Digital
 * @return: "true" or "false" depending on whether the content is successfully uploaded
 */
router.post('/upload', async (req, res) => {
  if(!req.isAuthenticated()) {
    res.redirect('/register')
  }

  console.log(req.user);
  
  const file = req.files.file;
  const preview = req.files.preview;
  const price = req.body.price;
  const academic = 0;
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;

  let category = ''
  switch(req.body.category) {
    case 'all':
      category = undefined
      break;
    case 'document':
      category = 1;
      break;
    case 'image':
      category = 2;
      break;
    case 'video':
      category = 3;
      break;
    case 'audio':
      category = 4;
      break;
    default:
      category = undefined;
  }

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
        preview.mv('./media/public/' + previewPath, (err) => {
          mediaManager.addMedia(title, description, previewPath, rawPath, category, price, req.user.acc_id, academic, type);
          return res.status(200).send({success: "true"});
        });
      }
      else {
        mediaManager.addMedia(title, description, previewPath, rawPath, category, price, req.user.acc_id, academic, type);
        return res.status(200).send({success: "true"});
      }
    });
  });
});

module.exports = router;

