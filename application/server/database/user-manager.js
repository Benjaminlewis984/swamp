var databaseManager = require('./database-manager.js');

exports.addUser = (username, password, email) => {
	var queryString = "('" + username + "', '" + password + "', '" + email + "');";
	databaseManager.queryDatabase("INSERT INTO users(username, password, email) VALUES " + queryString, (result) => {});
}

exports.getUser = (username, action) => {
	var queryString = "'" + username + "');";
	databaseManager.queryDatabase("SELECT EXISTS(SELECT * FROM users WHERE username = " + queryString, (existsResult) => {
		if (Object.values(existsResult[0])[0] == 1) {
			queryString = "'" + username + "';";
			databaseManager.queryDatabase("SELECT * FROM users WHERE username = " + queryString, (userResult) => {
				action(userResult);
			});
		}
	});
}

exports.deleteUser = (username) => {
	var queryString = "'" + username + "';";
	databaseManager.queryDatabase("DELETE FROM users WHERE username = " + queryString, (result) => {});
}