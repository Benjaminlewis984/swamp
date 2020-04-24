const databaseManager = require('./database-manager.js');

exports.addToCart = (m_id, acc_id) => {
  let approved_id;
  let reg_id;
  let price;

  databaseManager.queryDatabase(`SELECT approved.approved_id, media.price FROM \`media content\` media, \`approved media\` approved WHERE approved.m_id = media.m_id AND media.m_id = ?;`, [m_id], (result) => {
    approved_id = result[0]['approved_id'];
    price = result[0]['price'];
    databaseManager.queryDatabase(`SELECT registered.reg_id FROM \`registered users\` registered INNER JOIN accounts ON registered.acc_id = accounts.acc_id WHERE accounts.acc_id = ?;`, [acc_id], (result) => {
      reg_id = result[0]['reg_id'];
      databaseManager.queryDatabase(`INSERT INTO \`shopping cart\`(approved_id, price, reg_id) VALUES (?, ?, ?);`, [approved_id, price, reg_id], (result) => {});
    });
  });
}

exports.deleteFromCart = (m_id, acc_id) => {
  let approved_id;
  let reg_id;

  databaseManager.queryDatabase(`SELECT approved.approved_id, media.price FROM \`media content\` media, \`approved media\` approved WHERE approved.m_id = media.m_id AND media.m_id = ?;`, [m_id], (result) => {
    approved_id = result[0]['approved_id'];
    databaseManager.queryDatabase(`SELECT registered.reg_id FROM \`registered users\` registered INNER JOIN accounts ON registered.acc_id = accounts.acc_id WHERE accounts.acc_id = ?;`, [acc_id], (result) => {
      reg_id = result[0]['reg_id'];
      databaseManager.queryDatabase(`DELETE FROM \`shopping cart\` WHERE approved_id = ? AND reg_id = ?;`, [approved_id, reg_id], () => {});
    });
  })
}

exports.getFromCartByID = (acc_id, action) => {
  let reg_id;
  databaseManager.queryDatabase(`SELECT registered.reg_id FROM \`registered users\` registered INNER JOIN accounts ON registered.acc_id = accounts.acc_id WHERE accounts.acc_id = ?;`, [acc_id], (result) => {
    reg_id = result[0]['reg_id'];
    databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`shopping cart\` WHERE reg_id = ${reg_id};`, (count) => {
      if(count[0]['COUNT(*)'] > 0) {
        databaseManager.queryDatabase(`SELECT * FROM \`media content\` media, \`shopping cart\` cart, \`approved media\` approved WHERE cart.approved_id = approved.approved_id AND approved.m_id = media.m_id AND cart.reg_id = ?;`, [reg_id], (result) => {
          action(result);
        });
      } else {
          action(undefined);
      }
    })
  })
}