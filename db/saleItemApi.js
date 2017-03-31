var path = require('path');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require(path.resolve( __dirname, "./config.js"));


var getBySearch = function(search, callback){

    var requestString = "select sale.id as productId, sale.productTitle, sale.priceString, sale.itemDescription, store.storeName, store.storeLocation  from saleItems sale " +
    "join storeInfo store On sale.storeId = store.id " +
    "where productTitle like @searchString Or itemDescription like @searchString";

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status);
        } else {
            connection.close();
            status = "success";
            callback(status, rowCount, rows);
        }
    });

    request.addParameter('searchString', TYPES.VarChar, "%" + search.search + "%" );


    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        connection.execSql(request);
    });

};


module.exports = {
    getBySearch: getBySearch
};
