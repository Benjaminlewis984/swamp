const databaseManager = require('./database-manager.js');

exports.addUser = (username, password, email, first_name, last_name) => {
  databaseManager.queryDatabase(`INSERT INTO accounts(username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?);`, [username, password, email, first_name, last_name], (result) => {});
  databaseManager.queryDatabase(`INSERT INTO \`registered users\`(acc_id) VALUES ((SELECT acc_id FROM accounts WHERE username = ?));`, [username], (result) => {});
}

exports.banUser = (user, admin_id, reason, ban_length) => {
  let current_date = new Date();
  const date = current_date.toJSON().slice(0,10);
  current_date.setDate(current_date.getDate() + ban_length);
  const unban_date = current_date.toJSON().slice(0,10);

  user_acc_id = user[0]['acc_id'];

  databaseManager.queryDatabase(`SELECT reg_id FROM \`registered users\` WHERE acc_id = ?;`, [user_acc_id], (result) => {
    const reg_id = result[0]['reg_id'];
    databaseManager.queryDatabase(`INSERT INTO \`banned users\`(reg_id, banned_by, reason, ban_date, unban_date, ban_active) VALUES (?, ?, ?, ?, ?, ?);`, [reg_id, admin_id, reason, date, unban_date, 1], () => {})
  })
}

exports.getUserFromUsername = (username, action) => {
	databaseManager.queryDatabase(`SELECT EXISTS(SELECT * FROM accounts WHERE username = ?);`, [username], (existsResult) => {
		if (Object.values(existsResult[0])[0] == 1) {
			databaseManager.queryDatabase(`SELECT * FROM accounts WHERE username = ?`, [username], (userResult) => {
				action(userResult);
			});
		}
		else {
			action(undefined);
		}
	});
}

exports.getUserFromEmail = (email, action) => {
  databaseManager.queryDatabase(`SELECT EXISTS(SELECT * FROM accounts WHERE email = ?);`, [email], (existsResult) => {
    if (Object.values(existsResult[0])[0] == 1) {
      databaseManager.queryDatabase(`SELECT * FROM accounts WHERE email = ?;`, [email], (userResult) => {
        action(userResult);
      });
    }
    else {
      action(undefined);
    }
  });
}

exports.getUserFromID = (id, action) => {
  databaseManager.queryDatabase(`SELECT EXISTS(SELECT * FROM accounts WHERE acc_id = ?);`, [id], (existsResult) => {
    if (Object.values(existsResult[0])[0] == 1) {
      databaseManager.queryDatabase(`SELECT * FROM accounts WHERE acc_id = ?;`, [id], (userResult) => {
        action(userResult);
      });
    }
    else {
      action(undefined);
    }
  });
}

exports.updateUserPassword = (username, password) => {
	databaseManager.queryDatabase(`UPDATE accounts SET password = ? WHERE username = ?`, [password, username], (result) => {});
}

exports.checkUserBanned = (user, action) => {
  user_acc_id = user[0]['acc_id'];
  databaseManager.queryDatabase(`SELECT reg_id FROM \`registered users\` WHERE acc_id = ?;`, [user_acc_id], (result) => {
    const reg_id = result[0]['reg_id'];
    databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`banned users\` WHERE reg_id = ? AND ban_active = ?`, [reg_id, 1], (count) => {
      if(count[0]['COUNT(*)'] == 0) {
        action(result);
      } else {
        action(undefined);
      }
    });
  });
}