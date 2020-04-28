const express = require('express');
const router = express.Router();
const messageManager = require('../../database/message-manager.js');
const databaseManager = require('../../database/database-manager.js');
const passport_config = require('../../modules/passport-config.js');

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

module.exports = router;