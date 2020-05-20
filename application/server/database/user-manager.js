const databaseManager = require('./database-manager.js');

exports.addUser = async (username, password, email, first_name, last_name) => {
  await databaseManager.queryDatabase(`INSERT INTO accounts
    (username, password, email, first_name, last_name)
    VALUES (?, ?, ?, ?, ?);`, [username, password, email, first_name, last_name]);

  await databaseManager.queryDatabase(`INSERT INTO \`registered users\`(acc_id)
    VALUES ((SELECT acc_id FROM accounts WHERE username = ?));`, [username]);
}

exports.banUser = async (user, admin_id, reason, ban_length) => {
  let current_date = new Date();
  const date = current_date.toJSON().slice(0,10);
  current_date.setDate(current_date.getDate() + ban_length);
  const unban_date = current_date.toJSON().slice(0,10);

  const user_acc_id = user[0]['acc_id'];
  const reg = await this.getRegIDFromUser(user_acc_id);
  const reg_id = reg[0]['reg_id'];
  await databaseManager.queryDatabase(`INSERT INTO \`banned users\`
    (reg_id, banned_by, reason, ban_date, unban_date, ban_active)
    VALUES (?, ?, ?, ?, ?, ?);`, [reg_id, admin_id, reason, date, unban_date, 1]);
}

exports.unbanUser = async (user) => {
  const reg = await this.getRegIDFromUser(user[0]['acc_id']);
  const reg_id = reg[0]['reg_id'];
  await databaseManager.queryDatabase(`UPDATE \`banned users\` SET ban_active = 0 WHERE reg_id = ?;`, [reg_id]);
}

exports.getUserFromUsername = async (username) => {
  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM accounts WHERE username = ?;`, [username]);
  if(count[0]['COUNT(*)'] > 0) {
    const userResult = await databaseManager.queryDatabase(`SELECT * FROM accounts WHERE username = ?`, [username]);
    return userResult;
  }
  return undefined;
}

exports.getUserFromEmail = async (email) => {
  const count = await databaseManager.queryDatabase(`SELECT EXISTS(SELECT * FROM accounts WHERE email = ?);`, [email]);
  if(count[0]['COUNT(*)'] > 0) {
    const userResult = await databaseManager.queryDatabase(`SELECT * FROM accounts WHERE email = ?;`, [email]);
    return userResult;
  }
  return undefined;
}

exports.getUserFromID = async (id) => {
  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM accounts WHERE acc_id = ?;`, [id]);
  if(count[0]['COUNT(*)'] > 0) {
    const userResult = await databaseManager.queryDatabase(`SELECT * FROM accounts WHERE acc_id = ?;`, [id]);
    return userResult;
  }
  return undefined;
}

exports.updateUserPassword = async (username, password) => {
	await databaseManager.queryDatabase(`UPDATE accounts SET password = ? WHERE username = ?`, [password, username]);
}

exports.checkUserBanned = async (user) => {
  const user_acc_id = user[0]['acc_id'];
  const reg = await this.getRegIDFromUser(user_acc_id);

  if(reg != undefined) {
    const reg_id = reg[0]['reg_id'];
    const count = await databaseManager.queryDatabase(`SELECT COUNT(*), \`banned users\`.unban_date FROM \`banned users\` 
    WHERE reg_id = ? AND ban_active = 1;`, [reg_id]);
    
    if(count[0]['COUNT(*)'] != 0) {
      const unban_date = new Date(count[0]['unban_date'])
      const current_date = new Date()
      if(unban_date < current_date) {
        this.unbanUser(user);
        return undefined;
      }
      return reg;
    }
  }
  
  return undefined;
}

exports.getRegIDFromUser = async (acc_id) => {
  const count = await databaseManager.queryDatabase(`SELECT COUNT(*) FROM \`registered users\` WHERE acc_id = ?;`, [acc_id]);
  if(count[0]['COUNT(*)'] != 0) {
    const result = await databaseManager.queryDatabase(`SELECT reg_id FROM \`registered users\` WHERE acc_id = ?;`, [acc_id]);
    return result;
  } else { return undefined; }
}

exports.updateUserProfilePicture = async (profilePath, acc_id) => {
  await databaseManager.queryDatabase(`UPDATE \`accounts\` SET profile_path = ? WHERE acc_id = ?;`, [profilePath, acc_id]);
  return true;
}