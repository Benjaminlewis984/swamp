const databaseManager = require('./database-manager.js');

exports.addUser = (username, password, email, first_name, last_name) => {
  databaseManager.queryDatabase(`INSERT INTO accounts(username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?);`, [username, password, email, first_name, last_name], (result) => {});
  databaseManager.queryDatabase(`INSERT INTO \`registered users\`(acc_id) VALUES ((SELECT acc_id FROM accounts WHERE username = ?));`, [username], (result) => {});
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
    let reg_id = result[0]['reg_id'];
    databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`banned users\` WHERE reg_id = ? AND ban_active = ?`, [reg_id, 1], (count) => {
      if(count[0]['COUNT(*)'] == 0) {
        action(result);
      } else {
        action(undefined);
      }
    })
  })
}