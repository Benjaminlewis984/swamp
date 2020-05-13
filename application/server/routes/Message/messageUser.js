const express = require('express');
const router = express.Router();
const databaseManager = require('../../database/database-manager.js');
const messageManager = require('../../database/message-manager.js');
const passport_config = require('../../modules/passport-config.js');

/**
 * Renders the message page in the backend dashboard.
 * 
 * @return: Renders the message page and returns the acc_id of receiver, buy_request bool, and the m_id
 */
router.get('/message', (req, res) => {
  res.render('message', {results: req.query.acc_id, buy_request: req.query.buy_request, m_id: req.query.m_id});
});

/**
 * Receives information from the body and the user to send to the database.
 * 
 * @param req.user.acc_id: The user's acc_id
 * @param req.body.acc_id: The receiver's acc_id
 * @param req.body.message: The message to be sent to the recevier
 * @param req.body.buy_request: Determines if this message is requesting to buy a media content
 * @return: "true" if sent, "false" if user is not logged in
 */
router.post('/message', passport_config.checkAuth, async (req, res) => {
  const sender_id = req.user.acc_id;
  const receiver_id = req.body.acc_id;
  const message = req.body.message;
  const buy_request = req.body.buy_request || 0;

  if(req.user) {
    await messageManager.sendMessage(sender_id, receiver_id, message, buy_request);
    if(buy_request == 1) {
      const msg = await databaseManager.queryDatabase(`SELECT message_id FROM \`message box\` WHERE sender_id = ? and acc_id = ? ORDER BY message_id DESC;`, [sender_id, receiver_id]);
      await databaseManager.queryDatabase(`INSERT INTO \`message requests\`(message_id, m_id) VALUES (?, ?);`, [msg[0]['message_id'], req.body.m_id]);
    }
    return res.status(200).send({success: "true"});
  } else { return res.status(400).send({success: "false"}); }
});

module.exports = router;