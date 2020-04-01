var databaseManager = require('./database-manager.js');

exports.addUser = (username, password, email) => {
	var queryString = "('" + username + "', '" + password + "', '" + email + "');";
	databaseManager.queryDatabase("INSERT INTO users(username, password, email) VALUES " + queryString, (result) => {});
}
/*
Instead of deleting by usernames, we should just modify privilege to 'banned'

exports.deleteUser = (username) => {
	var queryString = "'" + username + "';";
	databaseManager.queryDatabase("DELETE FROM users WHERE username = " + queryString, (result) => {});
}*/

exports.updateUserPrivilege = (username, privilege) => {
	var usernameQueryString = "'" + username + "';";
	var privilegeQueryString = "'" + privilege + "'";
	databaseManager.queryDatabase("UPDATE users SET privilege = " + privilegeQueryString + " WHERE username = " + usernameQueryString, (result) => {});
}

exports.getUserFromUsername = (username, action) => {
	var queryString = "'" + username + "');";
	databaseManager.queryDatabase("SELECT EXISTS(SELECT * FROM users WHERE username = " + queryString, (existsResult) => {
		if (Object.values(existsResult[0])[0] == 1) {
			queryString = "'" + username + "';";
			databaseManager.queryDatabase("SELECT * FROM users WHERE username = " + queryString, (userResult) => {
				action(userResult);
			});
		}
		else {
			action(undefined);
		}
	});
}

exports.getUserFromEmail = (email, action) => {
  var queryString = "'" + email + "');";
  databaseManager.queryDatabase("SELECT EXISTS(SELECT * FROM users WHERE email = " + queryString, (existsResult) => {
    if (Object.values(existsResult[0])[0] == 1) {
      queryString = "'" + email + "';";
      databaseManager.queryDatabase("SELECT * FROM users WHERE email = " + queryString, (userResult) => {
        action(userResult);
      });
    }
    else {
      action(undefined);
    }
  });
}

exports.getUserFromID = (id, action) => {
  var queryString = "'" + id + "');";
  databaseManager.queryDatabase("SELECT EXISTS(SELECT * FROM users WHERE id = " + queryString, (existsResult) => {
    if (Object.values(existsResult[0])[0] == 1) {
      queryString = "'" + id + "';";
      databaseManager.queryDatabase("SELECT * FROM users WHERE id = " + queryString, (userResult) => {
        action(userResult);
      });
    }
    else {
      action(undefined);
    }
  });
}

exports.updateUserPassword = (username, password) => {
	var usernameQueryString = "'" + username + "';";
	var passwordQueryString = "'" + password + "'";
	databaseManager.queryDatabase("UPDATE users SET password = " + passwordQueryString + " WHERE username = " + usernameQueryString, (result) => {});
}