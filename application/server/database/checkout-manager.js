const databaseManager = require('./database-manager.js');
const userManager = require('./user-manager.js');
const cartManager = require('./cart-manager.js');
const messageManager = require('./message-manager.js');

exports.buyAllInCart = async (acc_id) => {
  const reg = await userManager.getRegIDFromUser(acc_id);
  const reg_id = reg[0]['reg_id'];
  const results = await cartManager.getFromCartByID(reg_id);
  if(results.length == 0) { return ''; }

  results.forEach(async (result, idx) => {
    const approved_id = result['approved_id'];
    const receiver = await databaseManager.queryDatabase(`
      SELECT acc.acc_id 
      FROM accounts acc 
      INNER JOIN \`media content\` mc ON acc.acc_id = mc.acc_id 
      INNER JOIN \`approved media\` am ON mc.m_id = am.m_id
      INNER JOIN \`shopping cart\` sc ON am.approved_id = sc.approved_id
      WHERE sc.approved_id = ?;`, [approved_id]);

    const user = await userManager.getUserFromID(acc_id);
    const media = await databaseManager.queryDatabase(`
      SELECT mc.title, mc.m_id 
      FROM \`media content\` mc 
      INNER JOIN \`approved media\` am ON mc.m_id = am.m_id
      WHERE am.approved_id = ?;`, [result['approved_id']]);
    const message = `User ${user[0]['username']} is requesting to buy ${media[0]['title']}.`
    await messageManager.sendMessage(acc_id, receiver[0]['acc_id'], message, 1);

    const msg = await databaseManager.queryDatabase(`
      SELECT message_id 
      FROM \`message box\` 
      WHERE sender_id = ? AND acc_id = ? 
      ORDER BY message_id DESC LIMIT 1;`, [acc_id, receiver[0]['acc_id']]);

    await databaseManager.queryDatabase(`INSERT INTO \`message requests\`(message_id, m_id) VALUES (?, ?);`, [msg[0]['message_id'], media[0]['m_id']]);
    if(idx == results.length - 1) {
      await databaseManager.queryDatabase(`DELETE FROM \`shopping cart\` WHERE reg_id = ?;`, [reg_id]);
      return '';
    }
  });

  return '';
}

exports.checkMediaInApprovedRequests = async (acc_id, m_id) => {
  const count = await databaseManager.queryDatabase(`
    SELECT COUNT(*) 
    FROM \`approved requests\` ar
    INNER JOIN \`message requests\` mr ON ar.request_id = mr.request_id
    INNER JOIN \`media content\` mc ON mr.m_id = mc.m_id
    INNER JOIN \`message box\` mb ON mr.message_id = mb.message_id
    WHERE mb.sender_id = ? AND mc.m_id = ?;`, [acc_id, m_id]);

  if(count[0]['COUNT(*)'] > 0) {
    return '';
  }

  return undefined;
}