const databaseManager = require('./database-manager.js');
const userManager = require('./user-manager.js');
const cartManager = require('./cart-manager.js');

exports.checkoutItems = async (acc_id) => {
  const reg = await userManager.getRegIDFromUser(acc_id);
  if(reg != undefined) {
    let reg_id = reg[0]['reg_id'];
    const appr = await databaseManager.queryDatabase(`SELECT approved.approved_id, media.m_id
      FROM \`media content\` media
      INNER JOIN \`approved media\` approved
      ON media.m_id = approved.m_id
      LEFT JOIN \`shopping cart\` cart
      ON cart.approved_id = approved.approved_id
      WHERE cart.reg_id = ?;`, [reg_id]);

    let approved_id = appr[0]['approved_id'];
    let m_id = appr[0]['m_id'];
    await databaseManager.queryDatabase(`INSERT INTO checkout(approved_id, reg_id) VALUES (?, ?);`, [approved_id, reg_id]);
    await cartManager.deleteFromCart(m_id, acc_id);
    const last_id = await databaseManager.queryDatabase(`SELECT order_id FROM checkout ORDER BY order_id DESC`, []);
    const order_id = last_id[0]['order_id'];

    for(let i = 1; i < appr.length; ++i) {
      approved_id = appr[i]['approved_id'];
      m_id = appr[i]['m_id'];
      await databaseManager.queryDatabase(`INSERT INTO checkout
        (order_id, approved_id, reg_id)
        VALUES (?, ?, ?);`, [order_id, approved_id, reg_id]);
      await cartManager.deleteFromCart(m_id, acc_id);
    }

    return '';
  }

  return undefined;
}

exports.checkMediaInCheckout = async (acc_id, m_id) => {
  const reg = await userManager.getRegIDFromUser(acc_id);
  if(reg != undefined) {
    var reg_id = reg[0]['reg_id'];
    const appr = await databaseManager.queryDatabase(`SELECT approved_id FROM \`approved media\` WHERE m_id = ?;`, [m_id]);
    var approved_id = appr[0]['approved_id'];

    const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM checkout WHERE approved_id = ? AND reg_id = ?;`, [approved_id, reg_id]);
    if(count[0]['COUNT(*)'] > 0) {
      return '';
    }
  }

  return undefined;
}