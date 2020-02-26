var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();

router.get('/register', alreadyAuth, (req, res, next) => {
  res.render('register', { title: 'Sign up' });
});

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  if (username == username.replace(/[^A-Za-z0-9]/gi,'')) {
    if(/[A-Za-z0-9]*@mail\.sfsu\.edu/gi.test(email)) {
      userManager.getUserFromUsername(username, (usernameResult) => {
        if (usernameResult == undefined) {
          userManager.getUserFromEmail(email, (emailResult) => {
            if (emailResult == undefined) {
              userManager.addUser(username, password, email);
              res.send("Added user");
              //res.redirect('/login');
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
  //res.redirect('/error');
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
