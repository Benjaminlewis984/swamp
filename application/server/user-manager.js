var databaseManager = require('./database-manager.js');

exports.addUser = (username, password, email) => {
	var queryString = "('" + username + "', '" + password + "', '" + email + "');";
	databaseManager.queryDatabase("INSERT INTO users(username, password, email) VALUES " + queryString);
}

exports.deleteUser = (username) => {
	var queryString = "'" + username + "';";
	databaseManager.queryDatabase("DELETE FROM users WHERE username = " + queryString);
}