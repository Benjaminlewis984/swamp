const express = require('express');
const router = express.Router();
const messageManager = require('../../database/message-manager.js');
const passport_config = require('../../modules/passport-config.js');

/**
 * Renders the message page in the backend dashboard.
 * 
 * @return: Renders the message page and returns the acc_id of receiver
 */
router.get('/message', (req, res) => {
  res.render('message', {results: req.query.acc_id});
});

/**
 * Receives information from the body and the user to send to the database.
 * 
 * @param req.user.acc_id: The user's acc_id
 * @param req.body.acc_id: The receiver's acc_id
 * @param req.body.message: The message to be sent to the recevier
 * @return: "true" if sent, "false" if user is not logged in
 */
router.post('/message', passport_config.checkAuth, (req, res) => {
  const sender_id = req.user.acc_id;
  const receiver_id = req.body.acc_id;
  const message = req.body.message;

  if(req.user) {
    messageManager.sendMessage(sender_id, receiver_id, message, 1);
    return res.status(200).send({success: "true"});
  } else { return res.status(400).send({success: "false"}); }
});

module.exports = router;