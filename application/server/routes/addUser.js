var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/addUser/:username/:password/:email', function(req, res, next) {
  var username = req.params.username;
  var password = req.params.password;
  var email = req.params.email;
  
  if (username == username.replace(/[^A-Za-z0-9]/gi,'') && email == email.replace(/[^A-Za-z0-9]/gi,'')) {
    if(/[A-Za-z0-9]*[@mail\.sfsu\.edu]/gi.test(email)) {
      userManager.getUserFromUsername(username, (usernameResult) => {
        if (usernameResult == undefined) {
          userManager.getUserFromEmail(email, (emailResult) => {
            if (emailResult == undefined) {
              userManager.addUser(username, password, email);
              res.send("Added user!");
            }
            else {
              res.send("Email already exists!");
            }
          });
        }
        else {
          res.send("Username already exists!");
        }
      });
    }
    else {
      res.send("Invalid Email");
    }
  }
  else {
    res.send("Invalid information!");
  }
});

module.exports = router;
