const databaseManager = require('./database-manager.js');
const userManager = require('./user-manager.js');
const cartManager = require('./cart-manager.js');

exports.checkoutItems = (acc_id, action) => {
  userManager.getRegIDFromUser(acc_id, (reg) => {
    if(reg == undefined) { action(undefined); }
    else {
      const reg_id = reg[0]['reg_id'];
      databaseManager.queryDatabase(`SELECT approved.approved_id, media.m_id FROM \`media content\` media INNER JOIN \`approved media\` approved ON media.m_id = approved.m_id LEFT JOIN \`shopping cart\` cart ON cart.approved_id = approved.approved_id WHERE cart.reg_id = ?;`, [reg_id], (results) => {
        let approved_id = results[0]['approved_id'];
        let m_id = results[0]['m_id'];

        databaseManager.queryDatabase(`INSERT INTO checkout(approved_id, reg_id) VALUES (?, ?);`, [approved_id, reg_id], () => {});
        cartManager.deleteFromCart(m_id, acc_id);
        databaseManager.queryDatabase(`SELECT order_id FROM checkout ORDER BY order_id DESC`, [], (last_id) => {
          const order_id = last_id[0]['order_id'];
          for(let i = 1; i < results.length; ++i) {
            approved_id = results[i]['approved_id'];
            m_id = results[i]['m_id'];
            databaseManager.queryDatabase(`INSERT INTO checkout(order_id, approved_id, reg_id) VALUES (?, ?, ?);`, [order_id, approved_id, reg_id], () => {});
            cartManager.deleteFromCart(m_id, acc_id);
          }

          action('');
        });
      });
    }
  });
}