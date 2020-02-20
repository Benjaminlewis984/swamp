var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/addUser/:username/:password/:email', function(req, res, next) {
  userManager.getUserFromUsername(req.params.username, (usernameResult) => {
    if (usernameResult == undefined) {
      userManager.getUserFromEmail(req.params.email, (emailResult) => {
        if (emailResult == undefined) {
          userManager.addUser(req.params.username, req.params.password, req.params.email);
          res.send("Added user!");
        }
        else {
          res.send("User already exists!");
        }
      });
    }
    else {
      res.send("User already exists!");
    }
  });
});

module.exports = router;
