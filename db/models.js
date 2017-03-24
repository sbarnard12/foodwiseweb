
/* 
Set up the schema for the tables, save them as a model object
*/

//store information table
var SequelizeLib = require('sequelize');
var sequelize = require('./db');

var storeInfoModel = sequelize.define('storeInfo', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey:true,
		autoIncrement: true
		},
	store_name: {type: SequelizeLib.STRING},
	store_location: {type: SequelizeLib.STRING}
});


//Sale item table

var saleItemModel = sequelize.define('saleItems', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey:true,
		autoIncrement: true
		},
	productTitle: {type: SequelizeLib.STRING},
	priceString: {type: SequelizeLib.DOUBLE},
	item_description: {type: SequelizeLib.STRING}
});

//set foreign key
//1 store has many sale items, 1:many
storeInfoModel.hasMany(saleItemModel, {as: 'saleItems'});


module.exports = {
	storeInfoModel: storeInfoModel,
	saleItemModel: saleItemModel
	};


