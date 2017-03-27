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

var checkUser = function(req, user, callback){

    var username = user.userName;
    var password = user.password;

    userApi.getUserByUserName(username, function(status, count, user){
        if(status == "success"){
            //check if password matches
            var userObject = user[0];
            if(userObject[4].value == password){
                req.user = userObject;
                req.session.user_id = userObject[0].value;
                req.session.userName = userObject[3].value;
                req.session.name = userObject[1].value + " " + userObject[2].value;
                callback("success");
            } else { //wrong password
                callback("invalid username or password");
            }
        } else {
            callback("invalid username or password");
        }
    });
};

var getUser = function(req,res, next){
    if(req.session && req.session.userName){
        userApi.getUserByUserName(req.session.userName, function(status, count, user){
            if(count > 0){
                var userObject = user[0];
                req.user = userObject;
                req.session.user_id = userObject[0].value;
                req.session.userName = userObject[3].value;
                req.session.name = userObject[1].value + " " + userObject[2].value;
                res.locals.user = userObject;
            }
            next();
        })
    } else {
        next();
    }
};

var logoutUser = function(req, callback){
    req.session.destroy();
    callback("success");
}


var returnError = function(status){
    var result = {};
    result.status = "fail";
    result.error = status;
    return result;
}
;

module.exports = {
    newUser: newUser,
    checkUser: checkUser,
    getUser: getUser,
    logoutUser: logoutUser
}