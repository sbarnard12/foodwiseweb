
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
},
    {timestamps: false});


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
},
    {timestamps: false});

var usersModel = sequelize.define('users', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey:true,
		autoIncrement:true
	},
	firstName: {type: SequelizeLib.STRING},
	lastName: {type: SequelizeLib.STRING},
	userName: {type: SequelizeLib.STRING},
	password: {type: SequelizeLib.STRING}
},
    {timestamps: false});

var preferences = sequelize.define('preferences', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	allergies: {type: SequelizeLib.STRING},
	//vegetarian: {type: SequelizeLib.INTEGER},
	dislikes: {type: SequelizeLib.STRING},
	likes: {type: SequelizeLib.STRING},
	favouriteRecipes: {type: SequelizeLib.STRING}
	//nutritionPreferences: {type: SequelizeLib.INTEGER}
},
    {timestamps: false});

var flavourPreferences = sequelize.define('flavourPreferences', {
	id: {
		type: SequelizeLib.INTEGER,
		primaryKey: true,
		autoIncrement: true
	}
	/*salty: {type: SequelizeLib.INTEGER},
	sweet: {type: SequelizeLib.INTEGER},
	bitter: {type: SequelizeLib.INTEGER},
	meaty: {type: SequelizeLib.INTEGER},
	spicy: {type: SequelizeLib.INTEGER} */
},
    {timestamps: false});

//lookup tables
var flavourLookup = sequelize.define('flavourTypes', {
        flavourTypeId: {
            type: SequelizeLib.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        flavourTypeName: {type: SequelizeLib.STRING}
    },
    {timestamps: false});

var nutritionLookup = sequelize.define('nutritionLookup', {
    nutritionId: {
        type: SequelizeLib.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nutritionType: {type: SequelizeLib.STRING}
},
    {timestamps: false});

var vegLookup = sequelize.define('vegLookup', {
    vegId: {
        type: SequelizeLib.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vegname: {type: SequelizeLib.STRING}
},
    {timestamps: false});



//set foreign key
saleItemModel.hasOne(storeInfoModel, {as: 'storeId'});
usersModel.hasOne(preferences, {as: 'preferences'});
flavourPreferences.hasMany(preferences, {as: 'flavourPreferences'});
nutritionLookup.hasMany(preferences, {as: 'nutritionPreferences'});
vegLookup.hasMany(preferences, {as: 'vegetarian'});
flavourLookup.hasMany(flavourPreferences, {as: 'salty'});
flavourLookup.hasMany(flavourPreferences, {as: 'sweet'});
flavourLookup.hasMany(flavourPreferences, {as: 'bitter'});
flavourLookup.hasMany(flavourPreferences, {as: 'meaty'});
flavourLookup.hasMany(flavourPreferences, {as: 'spicy'});

module.exports = {
	storeInfoModel: storeInfoModel,
	saleItemModel: saleItemModel,
    usersModel: usersModel,
    flavourPreferences: flavourPreferences,
    preferences: preferences,
    flavourLookup: flavourLookup,
    nutritionLookup: nutritionLookup,
    vegLookup: vegLookup
};


