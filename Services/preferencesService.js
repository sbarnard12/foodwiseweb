var http = require('http');
var path = require('path');
var userApi = require('../db/userApi');
var preferencesApi = require('../db/preferencesApi');
var recipeLookup = require(path.resolve( __dirname, "./recipeApiLookup.js"));

var getPreferencesbyUserId = function(userId, callback) {
    preferencesApi.getAllRelevantPreferencesByUserId(userId, function(status, rowCount, preferences){
        if(status == "success"){
            var preferenceObject = {};
            if(typeof preferences[2].value != "undefined" && preferences[2].value != null){
                preferenceObject.allergies = preferences[2].value.split(",");
            } else {
                preferenceObject.allergies = [];
            }
            preferenceObject.dislikes = preferences[3].value;
            preferenceObject.likes = preferences[4].value;
            preferenceObject.vegString = preferences[5].value;
            preferenceObject.nutrition = preferences[6].value;
            preferenceObject.flavours = {
                salty: preferences[7].value,
                sweet: preferences[8].value,
                bitter: preferences[9].value,
                meaty: preferences[10].value,
                spicy: preferences[11].value
            };
            callback(preferenceObject);
        } else {
            callback(status);
        }
    });
};

var updatePreferences = function(request, callback){
    var data = request.body;
    data.userId = request.session.userId;

    if (typeof data.allergies == 'object'){
        data.allergies = data.allergies.join(",");
    }
    
    preferencesApi.updatePreferences(data.userId, data, function(status, count, result){
        var feedback = {status: status, count: count, result: result};
        callback(feedback);
    });
};

module.exports = {
    getPreferencesbyUserId: getPreferencesbyUserId,
    updatePreferences: updatePreferences
};