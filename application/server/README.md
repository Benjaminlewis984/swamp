# Server API

## database-manager
Example:

```javascript
var databaseManager = require('./database-manager.js');
databaseManager.connect();
databaseManager.setDatabase("test_database");
databaseManager.queryDatabase("SHOW TABLES;");
databaseManager.end();

```

### *.connect()
Establishes a connection from the NodeJS server to the MySQL database server.

### *.end()
Destroys the connection established from the NodeJS server to the MySQL database server.

### *.setDatabase(targetDatabase)
Sets the current working database. **Database must already exist in the server.**

Parameters:
- targetDatabase - name of database

### *.query(queryMySQL)
Query the current working database. Can still be used to create a new database.

Parameters:
- queryMySQL - MySQL syntax compliant query