/*
Set up database connection
connect to azure database foodwise2
*/

var Sequelize = require('sequelize');

//sets up connection
var sequelize = new Sequelize('foodwise2', 'foodwise2_admin@foodwise2', 'Syde322password', 
	{
		host:'foodwise2.database.windows.net',
		dialect: 'mssql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000
		},
		dialectOptions: {
			encrypt: true
		}
	});

//tests connection
sequelize.authenticate().then(function(err){
	if(err){
		console.log("Unable to connect");
	} else {
		console.log("connection success");
	}
});


module.exports = sequelize;
