
/* 
Set up the schema for the tables, save them as a model object
*/
var SequelizeLib = require('sequelize');
var sequelize = require('./db/db');

var storeInfoModel = sequelize.define('storeInfo', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey:true,
		autoIncrement: true
		},
	store_name: {type: SequelizeLib.STRING},
	store_location: {type: SequelizeLib.STRING}
})

module.exports = storeInfoModel;


