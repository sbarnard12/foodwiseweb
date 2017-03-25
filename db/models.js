
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

var users = sequelize.define('users', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	firstName: {type: SequelizeLib.STRING},
	lastName: {type: SequelizeLib.STRING},
	userName: {type: SequelizeLib.STRING},
	password: {type: SequelizeLib.STRING}
})

var preferences = sequelize.define('preferences', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	allergies: {type: SequelizeLib.STRING},
	vegetarian: {type: SequelizeLib.ENUM('vegetarian', 'vegan','meat')},
	dislikes: {type: SequelizeLib.STRING},
	likes: {type: SequelizeLib.STRING},
	favouriteRecipes: {type: SequelizeLib.STRING},
})



//set foreign key
//1 store has many sale items, 1:many
storeInfoModel.hasMany(saleItemModel, {as: 'saleItems'});


module.exports = {
	storeInfoModel: storeInfoModel,
	saleItemModel: saleItemModel
	};


