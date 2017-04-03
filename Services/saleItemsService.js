var http = require('http');
var path = require('path');
var userApi = require('../db/userApi');
var preferencesApi = require('../db/preferencesApi');
var saleItemApi = require('../db/saleItemApi');
var recipeLookup = require(path.resolve( __dirname, "./recipeApiLookup.js"));

var searchSaleItems = function(searchterm, data, callback){
    data = data.body;
    data.search = searchterm;
    
    saleItemApi.getBySearch(data, function(result,count, rows){
        if(result == "success"){
            callback(rows);
        } else {
            callback(result);
        }
    })
};

module.exports = {
    searchSaleItems: searchSaleItems
}