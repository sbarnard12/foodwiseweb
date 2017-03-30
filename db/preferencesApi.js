var path = require('path');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require(path.resolve( __dirname, "./config.js"));

var getPreferencesById = function(prefId, callback){
    var requestString = "select * from preferences where id= '" + prefId + "';";

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = undefined;
        if(err){
            connection.close();
            status = err;
            callback(status, rowCount, rows);
        } else {
            connection.close();
            status = "success";
            callback(status, rowCount, rows);
        }
    });

    var connection = new Connection(config);
    connection.on('connect', function(err){
        if (err) callback(err);
        connection.execSql(request);
    });
};

var insertIngredients = function(data,callback) {
    var requestString = "";
    requestString += "update preferences set homeIngredients=";
    requestString +="@homeIngredients where id=@prefID";
    requestString += ";";

    var row_id = undefined;

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status)
        } else {
            //make sure to close the connection before the callback
            connection.close();
            status = "success";
            callback(status);
        }

    });

    //add variable parameters
    request.addParameter('homeIngredients',TYPES.VarChar, data.homeIng.toString());
    request.addParameter('prefID',TYPES.Int, data.user_id);
    console.log("INSIDE preferenceAPI insertIng: homeIng="+data.homeIng.toString()+" user_d="+data.user_id+".");
    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
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
        } else {
            //make sure to close the connection before the callback
            connection.close();
            status = "success";
            callback(status, row_id);
        }

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
        connection.execSql(request);
    });
};

var getAllRelevantPreferencesByUserId = function(userId, callback){
    var requestString = crazyJoinString + "'" + userId +"'";

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = undefined;
        if(err){
            connection.close();
            status = err;
            callback(status);
        } else {
            connection.close();
            status = "success";
            callback(status, rowCount, rows[0]);
        }
    });

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        connection.execSql(request);
    });
};

var updatePreferences = function(prefId, callback){
    var requestString = "update preferences " +
        "set allergies = @allergies, " +
        "set dislikes = @dislikes, " +
        "set likes = @likes, " +
        "set favouriteRecipes = @favrecipes, " +
        "set vegetarian = @vegOption, " +
        "set nutritionPreferences = @nutritionPref, " +
        "where id='" + prefId + "';";

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status);
        } else {
            connection.close();
            status = "success";
            callback(status);
        }
    })
};

var crazyJoinString = "select u.userName as username, p.id, p.allergies, p.dislikes, p.likes, v.vegName, n.nutritionType, t1.flavourTypeName as salty, t2.flavourTypeName as sweet, t3.flavourTypeName as bitter, t4.flavourTypeName as meaty, t5.flavourTypeName as spicy " +
" from users u" +
" join preferences p On u.preferences = p.id join vegLookup v On p.vegetarian = v.vegId " +
" join nutritionLookup n on p.nutritionPreferences = n.nutritionId join flavourPreferences f On p.flavourPreferences = f.id " +
" join flavourTypes t1 On f.saltyId= t1.flavourTypeId join flavourTypes t2 On f.sweetId = t2.flavourTypeId " +
" join flavourTypes t3 On f.bitterId = t3.flavourTypeId join flavourTypes t4 On f.meatyId = t4.flavourTypeId " +
" join flavourTypes t5 On f.spicyId = t5.flavourTypeId " +
" where u.id = ";


module.exports = {
    getPreferencesById: getPreferencesById,
    createPref: createPref,
    getAllRelevantPreferencesByUserId: getAllRelevantPreferencesByUserId,
    insertIngredients: insertIngredients
};