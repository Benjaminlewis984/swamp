const databaseManager = require('./database-manager.js');

exports.sendMessage = async (sender_id, receiver_id, message) => {
  const date = new Date().toJSON().slice(0,10);
  const time = new Date().toJSON().slice(11,19);
  await databaseManager.queryDatabase(`INSERT INTO \`message box\` (sender_id, acc_id, message, date, time)
      VALUES (?, ?, ?, ?, ?);`, [sender_id, receiver_id, message, date, time]);
}

exports.receiveMessage = async (acc_id) => {
  const messages = await databaseManager.queryDatabase(`SELECT * FROM \`message box\` WHERE acc_id = ?;`, [acc_id]);
  return messages;
}