const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const userManager = require('../../database/user-manager.js');

const profilePath = path.join(__dirname, '../../media/public/profile');

/**
 * Renders the profile picture of a user
 * 
 * @param req.query.username: Username of the profile picture that is viewed
 * @return: Path of the profile picture in question
 */
router.get('/profile', async (req, res) => {
  const username = req.query.username;
  const user = await userManager.getUserFromUsername(username);
  res.render('profile', {path: user.profile_path.substring(8)});
});

/**
 * Endpoint to change user's profile picture. Takes a file and
 * stores in it the filesystem, while updating the path in the database.
 * 
 * @param req.files.file: The image that user wants as profile picture.
 * @return: "true" or "false" depending if user successfully changed their profile picture.
 */
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
    file.mv('./media/public/' + profilePath, (err) => {
      userManager.updateUserProfilePicture(profilePath, req.user.acc_id);
      return res.status(200).send({success: "true"});
    });
  });
});

module.exports = router;