var userApi = require('../db/userApi');


var newUser = function(data){
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
    userApi.createNewUser(data, function(result){
        console.log(result);
    });
};




module.exports = {
    newUser: newUser
}