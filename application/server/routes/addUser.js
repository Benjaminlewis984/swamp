var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.post('/addUser', (req, res) => {
  var username = req.query.username;
  var password = req.query.password;
  var email = req.query.email;

  if (username == username.replace(/[^A-Za-z0-9]/gi,'')) {
    if(/[A-Za-z0-9]*@mail\.sfsu\.edu/gi.test(email)) {
      userManager.getUserFromUsername(username, (usernameResult) => {
        if (usernameResult == undefined) {
          userManager.getUserFromEmail(email, (emailResult) => {
            if (emailResult == undefined) {
              userManager.addUser(username, password, email);
              res.send("Added user");
            }
            else {
              res.send("Email already exists");
            }
          });
        }
        else {
          res.send("Username already exists");
        }
      });
    }
    else {
      res.send("Invalid email");
    }
  }
  else {
    res.send("Invalid username");
  }
});

module.exports = router;
