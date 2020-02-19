var mysql = require('mysql')
var connection = mysql.createConnection({
	host: '35.247.83.230',
	user: 'root',
	password: 'teach',
	database: 'test_database'
})

exports.connect = () => {
	connection.connect((error) => {
		if (error) throw error;
		console.log("Connected to database");
	});
}