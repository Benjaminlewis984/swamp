const express = require('express');
const router = express.Router();
const messageManager = require('../../database/message-manager.js');

/**
 * Extracts the message_id from the body and, using that same message_id, retrieves
 * the corresponding request_id from the database. Then it inserts a new entry in the
 * 'Approved Requests' table of the database and also added the media to the checkout.
 * 
 * @param req.body.message_id: message_id of the request message.
 * @param: "true" if successfully approved the request
 */
router.post('/approve_request', async (req, res) => {
  const message_id = req.body.message_id;
  const request = await messageManager.getRequestFromID(message_id);
  const request_id = request[0]['request_id']
  await messageManager.approveRequest(message_id, request_id);
  return res.status(200).send({success: "true"});
});

/**
 * Extracts the message_id from the body and, using that same message_id, retrieves
 * the corresponding request_id from the database. Then it inserts a new entry in the
 * 'Rejected Requests' table of the database.
 * 
 * @param req.body.message_id: message_id of the request message.
 * @param: "true" if successfully rejected the request
 */
router.post('/reject_request', async (req, res) => {
  const message_id = req.body.message_id;
  const request = await messageManager.getRequestFromID(message_id);
  const request_id = request[0]['request_id']
  await messageManager.rejectRequest(message_id, request_id);
  return res.status(200).send({success: "true"});
});

/**
 * Extracts the message_id form the body and sets the 'read' attribute of the
 * table 'message box' to 1. Since the message box only retrieves unread messages,
 * the message is effectively deleted.
 * 
 * @param req.body.message_id: message_id of the message
 * @return: "true" if successfully deleted the request
 */
router.post('/delete_request', async (req, res) => {
  const message_id = req.body.message_id;
  await messageManager.deleteRequest(message_id);
  return res.status(200).send({success: "true"});
});

module.exports = router;