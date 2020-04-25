const databaseManager = require('./database-manager.js');
const userManager = require('./user-manager.js');

exports.addToCart = async (m_id, acc_id) => {
  const appr = await databaseManager.queryDatabase(`SELECT approved.approved_id, media.price
    FROM \`media content\` media, \`approved media\` approved
    WHERE approved.m_id = media.m_id AND media.m_id = ?;`, [m_id]);
  const approved_id = appr[0]['approved_id'];
  const price = appr[0]['price'];

  const reg = await userManager.getRegIDFromUser(acc_id);
  if(reg != undefined) {
    const reg_id = reg[0]['reg_id'];
    const already_inside = await self.checkMediaInCart(acc_id, m_id);
    if(already_inside == undefined) {
      await databaseManager.queryDatabase(`INSERT INTO \`shopping cart\`(approved_id, price, reg_id) VALUES (?, ?, ?)`, [approved_id, price, reg_id]);
    }
    return '';
  }
  return undefined;
}

exports.deleteFromCart = async (m_id, acc_id) => {
  const appr = await databaseManager.queryDatabase(`SELECT approved.approved_id, media.price
    FROM \`media content\` media, \`approved media\` approved
    WHERE approved.m_id = media.m_id AND media.m_id = ?;`, [m_id]);
  const approved_id = appr[0]['approved_id'];

  const reg = await databaseManager.queryDatabase(`SELECT registered.reg_id
    FROM \`registered users\` registered
    INNER JOIN accounts
    ON registered.acc_id = accounts.acc_id
    WHERE accounts.acc_id = ?;`, [acc_id]);

  if(reg != undefined) {
    const reg_id = reg[0]['reg_id'];
    databaseManager.queryDatabase(`DELETE FROM \`shopping cart\` WHERE approved_id = ? AND reg_id = ?;`, [approved_id, reg_id]);
    return '';
  }
  
  return undefined;
}

exports.getFromCartByID = async (acc_id) => {
  const reg = await userManager.getRegIDFromUser(acc_id);
  const reg_id = reg[0]['reg_id'];

  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`shopping cart\` WHERE reg_id = ?;`, [reg_id]);
  if(count[0]['COUNT(*)'] > 0) {
    const result = await databaseManager.queryDatabase(`SELECT * FROM \`media content\` media
      INNER JOIN \`shopping cart\` cart
      INNER JOIN \`approved media\` approved
      ON cart.approved_id = approved.approved_id AND approved.m_id = media.m_id
      WHERE cart.reg_id = ?;`, [reg_id]);
      
    return result;
  }

  return undefined;
}

exports.checkMediaInCart = async (acc_id, m_id) => {
  const reg = await userManager.getRegIDFromUser(acc_id);
  const reg_id = reg[0]['reg_id'];
  const appr = await databaseManager.queryDatabase(`SELECT approved_id FROM \`approved media\` WHERE m_id = ?;`, [m_id]);
  
  const approved_id = appr[0]['approved_id'];
  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`shopping cart\` WHERE approved_id = ? AND reg_id = ?;`, [approved_id, reg_id]);
  
  if(count[0]['COUNT(*)'] > 0) { return ''; }
  return undefined;
}