var path = require('path');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
//var config = require(path.resolve( __dirname, "./config.js"));
var config = require('./db/config.js')


var go = function(){
    //first check if username is taken
    getUserbyUserName("sam", function(status, user){
        console.log(user);
    })
};

var getUserbyUserName = function(username, callback){

    var requestString = "select * from users where userName = '" + username + "';";

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = undefined;
        if(err){
            connection.close();
            status = err;
            callback(status)
        } else {
            connection.close();
            status = "success";
            callback(status, rows)
        }
    });
    request.on('row', function(columns){
        columns.forEach(function(column){
            console.log(column.value);
        })
    });

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 2");
        connection.execSql(request);
    });

};

var createflavourPref = function(data, callback){

    var medium = 'Medium';
    var requestString = "";
    var row_id = undefined;
    requestString = requestString + "insert into flavourPreferences (saltyId, sweetId, bitterId, meatyId, spicyId) values(";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ medium +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ medium +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ medium +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ medium +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ medium +"')";
    requestString = requestString + "); select @@identity;";
    //requestString = requestString + "select @@identity";
    var request = new Request(requestString, function(err, rowCount, rows){
        if(err){
            console.log(err);
        }
        //make sure to close the connection before the callback
        connection.close();
        callback(rows, row_id);
    });

    request.on('row', function(columns){
        row_id = (columns[0].value);
    });

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 2");
        connection.execSql(request);
    });
};

var createPref = function(data, callback){
    var requestString = "";
    requestString = requestString + "insert into preferences (allergies, dislikes, likes, favouriteRecipes, vegetarian, nutritionPreferences, flavourPreferences) values(";
    requestString = requestString + "@allergies, @dislikes, @likes, @favouriteRecipes,";
    requestString = requestString + "(select vegId from vegLookup where vegName='" + data.vegetarian + "'),";
    requestString = requestString + "(select nutritionId from nutritionLookup where nutritionType='" + data.nutritionPreferences +"'),";
    requestString = requestString + "@flavourPrefId";
    requestString = requestString + "); SELECT @@identity;";

    var row_id = undefined;

    var request = new Request(requestString, function(err, rowCount, rows){
        if(err){
            console.log(err);
        }
        //make sure to close the connection before the callback
        connection.close();
        callback(rows, row_id);
    });

    request.on('row', function(columns){
        row_id = (columns[0].value);
    });

    //add variable parameters
    request.addParameter('allergies',TYPES.VarChar, data.allergies );
    request.addParameter('dislikes', TYPES.VarChar, data.dislikes);
    request.addParameter('likes', TYPES.VarChar, data.likes);
    request.addParameter('favouriteRecipes', TYPES.VarChar, data.favouriteRecipes);
    request.addParameter('flavourPrefId', TYPES.Int, data.flavPrefId);

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 2");
        connection.execSql(request);
    });
};

var createUser = function(userData, callback){
    var requestString = "";
    requestString = requestString + "insert into users (firstName, lastName, userName, password, preferences) values(";
    requestString = requestString + "@firstName, @lastName, @userName, @password,";
    requestString = requestString + "(select id from preferences where id='" + userData.prefId + "')";
    requestString = requestString + ");";

    var row_id = undefined;

    var request = new Request(requestString, function(err, rowCount, rows){
        if(err){
            console.log(err);
        }
        //make sure to close the connection before the callback
        connection.close();
        callback(rows, row_id);
    });

    request.on('row', function(columns){
        row_id = columns[0].value;
    });

    request.addParameter('firstName', TYPES.VarChar, userData.firstName);
    request.addParameter('lastName', TYPES.VarChar, userData.lastName);
    request.addParameter('userName', TYPES.VarChar, userData.userName);
    request.addParameter('password', TYPES.VarChar, userData.password);

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 2");
        connection.execSql(request);
    });
};

var checkUserName = function(userName, callback){
    var row_count = undefined;
    var request = new Request("select count(*) from users where userName = '" + userName + "';", function(err){
        if(err){
            console.log(err);
        }
        //make sure to close the connection before the callback
        connection.close();
        var isUnique = (row_count == 0);

        callback(isUnique);
    });

    request.on('row', function(columns){
        row_count = columns[0].value;
    });

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 2");
        connection.execSql(request);
    });

};

go();