const databaseManager = require('./database-manager.js');

exports.getMessageFromID = async (message_id) => {
  const message = await databaseManager.queryDatabase(`SELECT FROM \`message box\` WHERE message_id = ?;`, [message_id]);
  return message;
}

exports.getRequestFromID = async (message_id) => {
  const request = await databaseManager.queryDatabase(`SELECT * FROM \`message requests\` mr INNER JOIN \`message box\` mb ON mr.message_id = mb.message_id WHERE mb.message_id = ?;`, [message_id]);
  return request;
}

exports.sendMessage = async (sender_id, receiver_id, message, buy_request = 0) => {
  const date = new Date().toJSON().slice(0,10);
  const time = new Date().toJSON().slice(11,19);
  await databaseManager.queryDatabase(`INSERT INTO \`message box\` (sender_id, acc_id, message, date, time, buy_request)
      VALUES (?, ?, ?, ?, ?, ?);`, [sender_id, receiver_id, message, date, time, buy_request]);
}

exports.receiveMessage = async (acc_id) => {
  const messages = await databaseManager.queryDatabase(`SELECT * FROM \`message box\` WHERE acc_id = ? AND \`read\` = 0;`, [acc_id]);
  return messages;
}

exports.approveRequest = async (message_id, request_id) => {
  await databaseManager.queryDatabase(`INSERT INTO \`approved requests\`(request_id) VALUES (?);`, [request_id]);
  await databaseManager.queryDatabase(`UPDATE \`message box\` SET \`read\` = 1 WHERE message_id = ?;`, [message_id]);
  await databaseManager.queryDatabase(`UPDATE \`message requests\` SET status = ? WHERE request_id = ?;`, ['approved', request_id]);

  const reg = await databaseManager.queryDatabase(`SELECT reg_id FROM \`registered users\` ru 
  INNER JOIN accounts 
  ON ru.acc_id = accounts.acc_id 
  INNER JOIN \`message box\` mb 
  ON ru.acc_id = mb.acc_id 
  WHERE mb.message_id = ?;`, [message_id]);
  const reg_id = reg[0]['reg_id'];

  const media = await databaseManager.queryDatabase(`SELECT m_id FROM \`message requests\` WHERE request_id = ?;`, [request_id]);
  const m_id = media[0]['m_id'];
  const approved = await databaseManager.queryDatabase(`
  SELECT approved_id FROM \`approved media\` am 
  INNER JOIN \`media content\` mc 
  ON am.m_id = mc.m_id 
  INNER JOIN \`message requests\` mr 
  WHERE mr.m_id = ?;`, [m_id]);
  const approved_id = approved[0]['approved_id'];

  return '';
}

exports.rejectRequest = async (message_id, request_id) => {
  await databaseManager.queryDatabase(`INSERT INTO \`rejected requests\`(request_id) VALUES (?);`, [request_id]);
  await databaseManager.queryDatabase(`UPDATE \`message box\` SET \`read\` = 1 WHERE message_id = ?;`, [message_id]);
  await databaseManager.queryDatabase(`UPDATE \`message requests\` SET status = ? WHERE request_id = ?;`, ['rejected', request_id]);
  return '';
}

exports.deleteRequest = async (message_id) => {
  await databaseManager.queryDatabase(`UPDATE \`message box\` SET \`read\` = 1 WHERE message_id = ?;`, [message_id]);
  return '';
}