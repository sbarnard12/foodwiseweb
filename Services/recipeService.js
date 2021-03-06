var http = require('http');
var path = require('path');
var userApi = require('../db/userApi');
var preferencesApi = require('../db/preferencesApi');
var recipeLookup = require(path.resolve( __dirname, "./recipeApiLookup.js"));
var saleItemApi = require('../db/saleItemApi');
var originalPath = '/v1/api/recipes?_app_id=530cab32&_app_key=b20aff85e4721c30bed0b555397494d4&maxResult=25&start=1';
var originalgetOneOption = "/v1/api/recipe/";

var options = {
    host: 'api.yummly.com',
    path: '/v1/api/recipes?_app_id=530cab32&_app_key=b20aff85e4721c30bed0b555397494d4&maxResult=25&start=1'
};

var getOneOptions = {
    host: "api.yummly.com",
    path: "/v1/api/recipe/"
};

var apikey = "_app_id=530cab32&_app_key=b20aff85e4721c30bed0b555397494d4";

var getSearch = function(request, callback){
    //set query search term
    if(typeof request.params.searchterm == "undefined"){ //search all
        sendRequest(true, function(results){
            results.matches.forEach(function(item, index){
                item.ingredients = item.ingredients.join(",");
            })
            callback(results);
        });
    } else {
        var searchString = parseSearch(request.params.searchterm);
        var userId = request.session.userId;
        getPreferences(userId, request.query, function(preferences){
            var allergyString = parseAllergyString(preferences[2].value);
            //var dislikesString = parseDislikes(preferences[3].value);
            //var likesString = parseLikesString(preferences[4].value);
            var vegString = parseVegString(preferences[5].value);
            //var parseNutrition = parseNutrition(preferences[6].value);
            var flavourString = parseFlavour(preferences[7].value, preferences[8].value, preferences[9].value, preferences[10].value, preferences[11].value);

            options.path = originalPath;
            options.path = options.path + searchString;
            options.path = options.path + allergyString;
            //options.path = options.path + dislikesString;
            //options.path = options.path + likesString;
            options.path = options.path + vegString;
            //options.path = options.path + parseNutrition;
            options.path = options.path + flavourString;
            sendRequest(true, function(results){
                if (results.totalMatchCount == 0){
                    results.isNone = true;
                    callback(results)
                } else {
                    results.matches.forEach(function(item, index){
                        item.ingredients = item.ingredients.join(",");
                    });
                    callback(results);
                }
            });
        });
    }
};

var parseSearch = function(string){
    var stringArray = string.split(" ");
    var newString = stringArray.join("+");
    return "&q=" + newString;
};

var sendRequest = function(config1, callback){
    var responseFunc = function(response) {
        var str = '';

        //another chunk of data has been received, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function () {
            var test = JSON.parse(str);
            callback(test);
        });
    };
    if(config1){
        http.request(options, responseFunc).end();
    } else {
        http.request(getOneOptions, responseFunc).end();
    }
};

var getPreferences = function(userId, formData, callback){
    if(formData.usePref == "useNewPref"){ //use newly specified preferences
        //format them the same as the query would
        var preferences = ["",""];
        if(typeof formData.allergies == "object"){
            preferences.push({"value": formData.allergies.join(",")});
        } else {
            preferences.push({"value": ""});
        }
        preferences.push({"value": formData.dislikes});
        preferences.push({"value": formData.likes});
        preferences.push({"value": formData.vegOption});
        preferences.push({"value": formData.nutritionPref});
        preferences.push({"value": formData.salty});
        preferences.push({"value": formData.sweet});
        preferences.push({"value": formData.bitter});
        preferences.push({"value": formData.savoury});
        preferences.push({"value": formData.spicy});

        callback(preferences);

    } else { //query database to get user stored preferences
        preferencesApi.getAllRelevantPreferencesByUserId(userId, function(status, rowCount, preferences){
            if(status == "success"){
                callback(preferences);
            } else {
                callback(status);
            }
        })
    }
};

var parseAllergyString = function(allergyString){
    var allergies = "";
    if(allergyString != null){
        if(typeof allergyString == "undefined" || allergyString.length == 0 || allergyString.trim().length == 0){
            return allergies;
        }
        var split = allergyString.split(",");
        var allergyLookup = recipeLookup.allergies;
        split.forEach(function(item){
            if (item == "Tree Nut-Free"){
                item = "Tree%20Nut-Free";
            }
            allergies = allergies + "&allowedAllergy[]=" + allergyLookup[item] + "^" + item;
        });
        return allergies;
    }
    return "";
};

var parseVegString = function(vegString){
    var vegetarian = "";
    var vegLookup = recipeLookup.vegetarian;
    if (vegString == "Vegetarian") vegString = "Lacto-ovo%20vegetarian";
    if(vegString != "Non-Vegetarian"){
        vegetarian = "&allowedDiet[]=" +  vegLookup[vegString] + "^" + vegString;
    }
    return vegetarian;
};

var parseFlavour = function(salty, sweet, bitter, meaty, spicy){
    var flavourString = "";
    var flavourObject = {"salty": salty, "sweet":sweet, "bitter":bitter, "meaty":meaty, "piquant":spicy};
    for (var index in flavourObject){
        var flavourLevel = flavourObject[index];

        switch(flavourLevel){
            case "Default":
                break;
            case "Low":
                flavourString = flavourString + "&flavor." + index + ".max=0.33";
                break;
            case "Medium":
                flavourString = flavourString + "&flavor." + index + ".max=0.66";
                break;
            case "High":
                flavourString = flavourString + "&flavor." + index + ".max=1";
                break;
        }
    }
    return flavourString;
};

var recipeIngredients = "";

var getOne = function(request, callback){
    recipeIngredients = request.query.ingredients;
    var recipeId = request.params.recipeId;
    getOneOptions.path = originalgetOneOption;
    getOneOptions.path = getOneOptions.path + recipeId + "?" + apikey;

    sendRequest(false, function(results){
        console.log("test");
        var test = request.query.ingredients;

        //get home ingredients
        preferencesApi.getHomeIngredientsbyUserId(request.session.userId, function(status, homeIngredients){

            homeIngredients = homeIngredients[0].value;

            //get sale items, with store info
            saleItemApi.getAllDescriptions(function(status, salesItems){

                var homeIngredientArray = [];
                if (this.homeIngredients != null){
                    homeIngredientArray = this.homeIngredients.split(",");
                }

                for (var i=0; i< homeIngredientArray.length; i++){
                    homeIngredientArray[i] = homeIngredientArray[i].trim();
                }

                var recipeIngredientArray = this.recipeIngredients.split(",");
                var tempIngredientLinesObj = new Array(recipeIngredientArray.length);

                var ingredientDescriptions = [];
                for (var i = 0;i < salesItems.length; i++){
                    ingredientDescriptions.push(salesItems[i][0].value);
                }

                //check each recipe ingredient, and compare to home ingredients and sales items
                recipeIngredientArray.forEach(function(item, index){
                    //search home ingredient array for current recipe item
                    if(homeIngredientArray.indexOf(item) != -1){
                        //user has this item at home
                        tempIngredientLinesObj[index] = {ingredientLine: results.ingredientLines[index], atHome: true};
                    } else if (ingredientDescriptions.indexOf(item) != -1){ //then check the sales item db for the current recipe item
                        var foundItemIndex = ingredientDescriptions.indexOf(item);
                        
                        tempIngredientLinesObj[index] = {
                            ingredientLine: results.ingredientLines[index],
                            atHome: false,
                            onSale: true,
                            price: salesItems[foundItemIndex][1].value,
                            store: salesItems[foundItemIndex][2].value,
                            location: salesItems[foundItemIndex][3].value
                        }
                    } else { //neither home nor store has the recipe item on sale
                        tempIngredientLinesObj[index] = {ingredientLine: results.ingredientLines[index], atHome: false, onSale: false};
                    }
                });
                //results
                results.ingredientLines = tempIngredientLinesObj;
                callback(results);
            }.bind({recipeIngredients: this.recipeIngredients, homeIngredients: homeIngredients}))
        }.bind({recipeIngredients: (this.recipeIngredients)}))
    }.bind({recipeIngredients:recipeIngredients}))
};

module.exports = {
    //getAll: getAll,
    getSearch: getSearch,
    getOne: getOne
};