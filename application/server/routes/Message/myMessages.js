const express = require('express');
const router = express.Router();
const messageManager = require('../../database/message-manager.js');
const databaseManager = require('../../database/database-manager.js');
const passport_config = require('../../modules/passport-config.js');

/**
 * Queries the database to receive all the messages sent to your acc_id and returns them
 * 
 * @param req.user.acc_id:The user's acc_id
 * @return: Json containing an array of messages sent to user
 */

router.get('/messagebox', passport_config.checkAuth, async (req, res) => {
  const acc_id = req.user.acc_id;
  const messages = await messageManager.receiveMessage(acc_id);
  if(messages.length == 0) {
    res.send("Your message box is empty");
  } else {
    messages.forEach(async (message, idx) => {
      const sender = await databaseManager.queryDatabase(`SELECT username FROM accounts WHERE acc_id = ?;`, [message.sender_id]);
      message['sender'] = sender[0]['username'];
      if(idx == messages.length - 1) { res.render('checkMessages', {results: messages}); }
    });
  }
});

/**
 * Same as GET request, but for front end calls
 */
router.post('/messagebox', passport_config.checkAuth, async (req, res) => {
  const acc_id = req.user.acc_id;
  const messages = await messageManager.receiveMessage(acc_id);
  if(messages.length == 0) {
    res.status(200).send({ success: "true", results: "Your message box is empty"});
  } else {
    messages.forEach(async (message, idx) => {
      const sender = await databaseManager.queryDatabase(`SELECT username FROM accounts WHERE acc_id = ?;`, [message.sender_id]);
      message['sender'] = sender[0]['username'];
      if(idx == messages.length - 1) { return res.status(200).send( {success: "true", results: messages}); }
    });
  }
});

module.exports = router;