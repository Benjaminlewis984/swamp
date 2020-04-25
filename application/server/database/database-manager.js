const mysql = require('mysql');

/*var connectionInformation = {
	host: 'swamp-database-instance.c7yirp5jbhfm.us-east-2.rds.amazonaws.com',
	user: 'admin',
	password: '1vFhxpUjr0vof3KErgPi',
	database: 'swamp'
};*/

// Local DB for testing
const connectionInformation = {
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'mydb'
}

const connection = mysql.createConnection(connectionInformation);

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

exports.queryDatabase = (query, param) => {
	return new Promise((resolve, reject) => {
		query = query.replace(/[\n]/gm, ' ');
		connection.query(query, param, (err, result) => {
			if(err) { reject(err); }
			else { resolve(result); }
		});
	});
}