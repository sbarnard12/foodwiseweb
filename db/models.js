
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
});

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
	nutritionPreferences: {type: SequelizeLib.STRING}
});

var flavourEnum = SequelizeLib.ENUM('low', 'medium', 'high');

var flavourTypes = sequelize.define('flavourTypes', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	salty: {type: flavourEnum},
	sweet: {type: flavourEnum},
	bitter: {type: flavourEnum},
	meaty: {type: flavourEnum},
	spicy: {type: flavourEnum}
});


//set foreign key
//1 store has many sale items, 1:many
saleItemModel.hasOne(storeInfoModel, {as: 'storeId'});
preferences.hasOne(flavourTypes, {as: 'flavourtypes'});


module.exports = {
	storeInfoModel: storeInfoModel,
	saleItemModel: saleItemModel
	};


