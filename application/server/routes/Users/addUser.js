const userManager = require('../../database/user-manager.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport_config = require('../../modules/passport-config.js');

/**
 * Renders the signup page for backend dashboard
 */
router.get('/register', passport_config.alreadyAuth, (req, res, next) => {
  res.render('register', { title: 'Sign up' });
});

/**
 * Extracts necessary information to insert a new user account into the database
 * Before inserting into the database, we query the database to determine whether information
 * provided already exists. If so, user account is not created.
 * 
 * @param req.body.username: Potential user's username
 * @param req.body.email: Potential user's email
 * @param req.body.firstname: Potential user's first name
 * @param req.body.lastname: Potential user's last name
 * @return: "true" or "false" depending on whether the user's account was successfully created
 */
router.post('/register', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const first_name = req.body.firstname;
  const last_name = req.body.lastname;

  try { var hash_pass = await bcrypt.hash(req.body.password, 10); }
  catch { return res.status(404).send({success: "false"}); }

  if(username == username.replace(/[^A-Za-z0-9]/gi,'')) {
    if(/[A-Za-z0-9]*@mail\.sfsu\.edu/gi.test(email)) {
      const user = await userManager.getUserFromUsername(username);
      const userEmail = await userManager.getUserFromEmail(email);
      if(user == undefined && userEmail == undefined) {
        await userManager.addUser(username, hash_pass, email, first_name, last_name);
        return res.status(200).send({success: "true"});
      }
    }
  }

  return res.status(400).send({success: "false"});
});

module.exports = router;
