const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const userManager = require('../../database/user-manager.js');

const profilePath = path.join(__dirname, '../../media/public/profile');

router.get('/profile', (req, res) => {

  res.render('profile', {path: req.user.profile_path.substring(8)});
});

router.post('/profile', (req, res) => {
  const file = req.files.file;

  fs.readdir(profilePath, (err, files) => {
    let fileStringList = [];
    for (let x = 0; x < files.length; x++) {
      console.log(files[x].substr(0, files[x].indexOf('.')))
      fileStringList.push(files[x].substr(0, files[x].indexOf('.')));
    }

    let fileExtension = file.name.substr(file.name.indexOf('.'));

    let dateString = (new Date()).toISOString();
    dateString = dateString.substr(0, dateString.indexOf('T')) + ":";

    let fileNumber = 0;
    while (fileStringList.indexOf(dateString + fileNumber) != -1) {
      fileNumber += 1;
    }

    const profilePath = "profile/" + dateString + fileNumber + fileExtension;
    console.log(profilePath)
    file.mv('./media/' + profilePath, (err) => {
      userManager.updateUserProfilePicture(profilePath, req.user.acc_id);
      res.status(200).send({success: "true"});
    });
  });
});

module.exports = router;