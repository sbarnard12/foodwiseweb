var path = require('path');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require(path.resolve( __dirname, "./config.js"));

var createNewUser = function(userData, callback){
    //first check if username is taken
    checkUserName(userData.userName, function(isUnique){
        if(isUnique){
            //first need to create the flavourPref table
            createflavourPref(userData, function(status,row_id){
                //if failed, return to service the failure
                if(status != "success"){
                    callback(returnError(status));
                }
                //pass in the id of the flavour pref table into the userData object
                userData.flavPrefId = row_id;
                //pass the flavour pref table id into preferences

                //create the preferences table
                createPref(userData, function(status,row_id){
                    if (status != "success"){
                        callback(returnError(status));
                    }
                    //now finally create the user table
                    userData.prefId = row_id;
                    createUser(userData, function(status){
                        if(status == "success"){
                            callback(status);
                        } else {
                            callback(returnError(status));
                        }
                    });
                });
            });
        } else {
            //return error
            var result = {};
            result.status = "fail";
            result.error = "username already exists";

            callback(result);
        }
    });
};


var createflavourPref = function(data, callback){

    var requestString = "";
    var row_id = undefined;
    requestString = requestString + "insert into flavourPreferences (saltyId, sweetId, bitterId, meatyId, spicyId) values(";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.salty +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.sweet +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.bitter +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.meaty +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.spicy +"')";
    requestString = requestString + "); select @@identity;";
    var request = new Request(requestString, function(err, rowCount, rows){
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status)
        }
        //make sure to close the connection before the callback
        connection.close();
        status = "success";
        callback(status, row_id);
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
    requestString = requestString + "(select vegId from vegLookup where vegName='" + data.vegOption + "'),";
    requestString = requestString + "(select nutritionId from nutritionLookup where nutritionType='" + data.nutritionPref +"'),";
    requestString = requestString + "@flavourPrefId";
    requestString = requestString + "); SELECT @@identity;";

    var row_id = undefined;

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status)
        }
        //make sure to close the connection before the callback
        connection.close();
        status = "success";
        callback(status, row_id);
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
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status)
        }
        //make sure to close the connection before the callback
        connection.close();
        status = "success";
        callback(status);
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

var returnError = function(status){
    var result = {};
    result.status = "fail";
    result.error = status;
    return result;
}

module.exports = {
    createNewUser: createNewUser
}