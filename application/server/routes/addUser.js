var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/register', alreadyAuth, (req, res, next) => {
  res.render('register', { title: 'Sign up' });
});

router.post('/register', async (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  try {
    var hash_pass = await bcrypt.hash(req.body.password, 10);
  } catch {
    res.status(400);
    res.send("error");
  }

  if (username == username.replace(/[^A-Za-z0-9]/gi,'')) {
    if(/[A-Za-z0-9]*@mail\.sfsu\.edu/gi.test(email)) {
      userManager.getUserFromUsername(username, (usernameResult) => {
        if (usernameResult == undefined) {
          userManager.getUserFromEmail(email, (emailResult) => {
            if (emailResult == undefined) {
              userManager.addUser(username, hash_pass, email);
              res.status(200);
              res.send("Added user");
            }
            else {
              res.status(400);
              res.send("Email already exists");
            }
          });
        }
        else {
          res.status(400);
          res.send("Username already exists");
        }
      });
    }
    else {
      res.status(400);
      res.send("Invalid email");
    }
  }
  else {
    res.status(400);
    res.send("Invalid username");
  }
});

/**
 * Checks if user is already authenticated.
 * If so, redirect to homepage, otherwise next
 */
function alreadyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/');
  } else {
    return next();
  }
}

module.exports = router;
