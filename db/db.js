/*
Set up database connection
connect to azure database foodwise2
*/

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
    //userName: 'foodwise2_admin@foodwise2.database.windows.net',
    //password: 'Syde322password',
    //server: 'foodwise2.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    //options: {encrypt: true, database: 'AdventureWorks'}

    userName: 'foodwise2_admin@foodwise2',
    password: 'Syde322password',
    server: 'foodwise2.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    options: {encrypt: true, database: 'foodwise2'}
};

var connection2 = new Connection(config);
connection2.on('connect', function(err) {
    if (err) return console.error(err);
    console.log("Connected 2");
});


module.exports = {
	connection: connection2,
	request: Request,
	types: TYPES
}
