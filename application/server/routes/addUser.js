var userManager = require('../database/user-manager.js');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

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
              res.send({success: 'true'});
            }
            else {
              res.status(400);
              res.send({success: 'false', reason: 'email already exists'});
            }
          });
        }
        else {
          res.status(400);
          res.send({success: 'false', reason: 'username already exists'});
        }
      });
    }
    else {
      res.status(400);
      res.send({success: 'false', reason: 'invalid email'});
    }
  }
  else {
    res.status(400);
    res.send({success: 'false', reason: 'invalid username'});
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
