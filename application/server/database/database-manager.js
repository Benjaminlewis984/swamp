const mysql = require('mysql');

const connectionInformation = {
	host: 'swamp.c7yirp5jbhfm.us-east-2.rds.amazonaws.com',
	user: 'admin',
	password: '74DQSgJAXD4bPgAqJ1mv',
	database: 'mydb'
};

// Local DB for testing
// const connectionInformation = {
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'password',
// 	database: 'mydb'
// }

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