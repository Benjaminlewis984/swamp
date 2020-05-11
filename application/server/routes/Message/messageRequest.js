const express = require('express');
const router = express.Router();
const messageManager = require('../../database/message-manager.js');

router.post('/approve_request', async (req, res) => {
  const message_id = req.body.message_id;
  const request = await messageManager.getRequestFromID(message_id);
  const request_id = request[0]['request_id']
  await messageManager.approveRequest(message_id, request_id);
  return res.status(200).send({success: "true"});
});

router.post('/reject_request', async (req, res) => {
  const message_id = req.body.message_id;
  const request = await messageManager.getRequestFromID(message_id);
  const request_id = request[0]['request_id']
  await messageManager.rejectRequest(message_id, request_id);
  return res.status(200).send({success: "true"});
});

router.post('/delete_request', async (req, res) => {
  const message_id = req.body.message_id;
  await messageManager.deleteRequest(message_id);
  return res.status(200).send({success: "true"});
});

module.exports = router;