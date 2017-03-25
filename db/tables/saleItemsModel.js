
/* 
Set up the schema for the tables, save them as a model object
*/

//Sale item table
var SequelizeLib = require('sequelize');
var sequelize = require('./db/db');

var storeInfoModel = sequelize.define('saleItems', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey:true,
		autoIncrement: true
		},
	store_id: {
		
	}	
	productTitle: {type: SequelizeLib.STRING},
	priceString: {type: SequelizeLib.DOUBLE},
	item_description: {type: SequelizeLib.STRING}
})

module.exports = storeInfoModel;
