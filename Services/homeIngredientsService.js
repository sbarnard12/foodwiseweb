var userApi = require('../db/userApi');
var preferencesApi = require('../db/preferencesApi');


var setHomeIngredients= function(req, callback){
    //put the flavours into an object to better access them

    var data=req.body;
    data.user_id=req.session.userId;
    console.log("inside sethomeing in service file. Userid is "+data.user_id);
    if (data.homeIng.length<255) {
        preferencesApi.insertIngredients(data,function(status) {
            if(status == "success"){
                callback(status);
            } else {
                callback(returnError(status));
            }
        });
    } else {
        var result = {};
        result.status = "fail";
        result.error = "Input length is too long. Please break entries up.";

        callback(result);
    }
};


var getHomeIngredients= function(req, callback){
    //put the flavours into an object to better access them

    var data=req.body;
    data.user_id=req.session.userId;
    console.log("inside seghomeing in service file. Userid is "+data.user_id);
    preferencesApi.getIngredients(data,function(status,rows) {
        if(status == "success"){

            console.log(rows[0]);
            callback(status, rows[0].value);
        } else {
            callback(status);
        }
    });
};

module.exports={
    setHomeIngredients: setHomeIngredients,
    getHomeIngredients: getHomeIngredients
};

