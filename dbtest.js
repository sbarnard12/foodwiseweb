var SequelizeLib = require('sequelize');
var model = require('./db/models.js');
var flavModel = model.flavourPreferences;
var preferenceModel = model.preferences;
var userModel = model.usersModel;
var flavourLookup = model.flavourLookup;


//create flavour preferences table first
flavourmod = flavModel.create();

flavourmod.setFlavourPreferences(2);





//create preferences


//create user

/* userModel.create({
    firstName: "Sam",
    lastName: "barnard",
    username: "sam",
    password: "sam"
}); */


/*
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
* */