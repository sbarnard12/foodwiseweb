var path = require('path');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require(path.resolve( __dirname, "./config.js"));


var createflavourPref = function(data, callback){

    var requestString = "";
    var row_id = undefined;
    requestString = requestString + "insert into flavourPreferences (saltyId, sweetId, bitterId, meatyId, spicyId) values(";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.salty +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.sweet +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.bitter +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.meaty +"'),";
    requestString = requestString + " (select flavourTypeId from flavourTypes where flavourTypeName= '"+ data.flavours.spicy +"')";
    requestString = requestString + "); select @@identity;";
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

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        connection.execSql(request);
    });
};


module.exports = {
    createflavourPref: createflavourPref
};