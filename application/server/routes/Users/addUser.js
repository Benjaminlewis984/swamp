const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport_config = require('../../modules/passport-config.js');

// If you're already a user, you can't register again
router.get('/register', passport_config.alreadyAuth, (req, res, next) => {
  res.render('register', { title: 'Sign up' });
});

router.post('/register', async (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let first_name = req.body.firstname;
  let last_name = req.body.lastname;

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
              userManager.addUser(username, hash_pass, email, first_name, last_name);
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

module.exports = router;
