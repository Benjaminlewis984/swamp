var mysql = require('mysql');

var connectionInformation = {
	host: 'swamp-database-instance.c7yirp5jbhfm.us-east-2.rds.amazonaws.com',
	user: 'admin',
	password: '1vFhxpUjr0vof3KErgPi',
	database: 'swamp'
};
var connection = mysql.createConnection(connectionInformation);

exports.connect = () => {
	connection.connect((error) => {
		if (error) throw error;
		console.log("opened connection");
	});
}

exports.end = () => {
	connection.end((error) => {
		if (error) throw error;
		console.log("closed connection");
	});
}

exports.queryDatabase = (query, action) => {
	connection.query(query, (error, result) => {
		if (error) throw error;
		// console.log("query: " + query);

		action(result);
	});
}