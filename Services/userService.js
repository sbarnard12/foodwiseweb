var userApi = require('../db/userApi');


var newUser = function(data, callback){
    //put the flavours into an object to better access them
    data.flavours = {
        salty: data.salty,
        sweet: data.sweet,
        bitter: data.bitter,
        meaty: data.meaty
    };
    if(typeof data.allergies == 'object'){
       data.allergies = data.allergies.join(","); 
    }

    data.nutritionPref = "Default";
    //create new user
    
    userApi.checkUserName(data.userName, function(isUnique){
        if(isUnique){
            userApi.createflavourPref(data, function(status,row_id) {
                if (status != "success") {
                    callback(returnError(status));
                }
                //pass in the id of the flavour pref table into the userData object
                data.flavPrefId = row_id;
                //pass the flavour pref table id into preferences
                userApi.createPref(data, function (status, row_id) {
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
        } else {
            var result = {};
            result.status = "fail";
            result.error = "username already exists";

            callback(result);
        }
    });
};

var checkUser = function(user, callback){

    userApi.checkUser(user, function(result){
        callback(result);
    })

};

var returnError = function(status){
    var result = {};
    result.status = "fail";
    result.error = status;
    return result;
}


module.exports = {
    newUser: newUser
}