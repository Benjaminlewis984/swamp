var mysql = require('mysql');

var connectionInformation = {
	host: '35.247.83.230',
	user: 'root',
	password: 'teach',
};
var connection = mysql.createConnection(connectionInformation);

exports.connect = () => {
	connection.connect((error) => {
		if (error) throw error;
		console.log("opened connection");
	});
}

exports.manageDatabase = (database) => {
	connection.changeUser({database: database}, (error) => {
		if (error) throw error;
	});
}

exports.end = () => {
	connection.end((error) => {
		if (error) throw error;
		console.log("closed connection");
	});
}