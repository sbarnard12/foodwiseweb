var userApi = require('../db/userApi');
var preferencesApi = require('../db/preferencesApi');


var setHomeIngredients= function(data, callback){
    //put the flavours into an object to better access them

    if (data.length<255) {
        preferencesApi.insertIngredients(data,function(callback))
    } else {
        var result = {};
        result.status = "fail";
        result.error = "Input length is too long. Please break entries up.";

        callback(result);
    }

    data.nutritionPref = "Default";
    //create new user

    userApi.checkUserName(data.userName, function(isUnique){
        if(isUnique){
            flavourPrefApi.createflavourPref(data, function(status,row_id) {
                if (status != "success") {
                    callback(returnError(status));
                }
                //pass in the id of the flavour pref table into the userData object
                data.flavPrefId = row_id;
                //pass the flavour pref table id into preferences
                preferencesApi.createPref(data, function (status, row_id) {
                    if (status != "success") {
                        callback(returnError(status));
                    }
                    //now finally create the user table
                    data.prefId = row_id;
                    userApi.createUser(data, function(status){
                        if(status == "success"){
                            callback(status);
                        } else {
                            callback(returnError(status));
                        }
                    });
                });
            });
        }
    });
};


module.exports={
    homeIngredients: homeIngredients,
};

