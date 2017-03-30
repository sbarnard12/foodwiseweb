var path = require('path');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require(path.resolve( __dirname, "./config.js"));

var createUser = function(userData, callback){
    var requestString = "";
    requestString = requestString + "insert into users (firstName, lastName, userName, password, preferences) values(";
    requestString = requestString + "@firstName, @lastName, @userName, @password,";
    requestString = requestString + "(select id from preferences where id='" + userData.prefId + "')";
    requestString = requestString + ");";

    var row_id = undefined;

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = "";
        if(err){
            connection.close();
            status = err;
            callback(status);
        } else {
            //make sure to close the connection before the callback
            connection.close();
            status = "success";
            callback(status);  
        }
    });

    request.on('row', function(columns){
        row_id = columns[0].value;
    });

    request.addParameter('firstName', TYPES.VarChar, userData.firstName);
    request.addParameter('lastName', TYPES.VarChar, userData.lastName);
    request.addParameter('userName', TYPES.VarChar, userData.userName);
    request.addParameter('password', TYPES.VarChar, userData.password);

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        connection.execSql(request);
    });
};

var checkUserName = function(userName, callback){
    var row_count = undefined;
    var request = new Request("select count(*) from users where userName = '" + userName + "';", function(err){
        if(err){
            console.log(err);
        }
        //make sure to close the connection before the callback
        connection.close();
        var isUnique = (row_count == 0);

        callback(isUnique);
    });

    request.on('row', function(columns){
        row_count = columns[0].value;
    });

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        connection.execSql(request);
    });

};

var getUserByUserName = function(username, callback){

    var requestString = "select * from users where userName = '" + username + "';";

    var request = new Request(requestString, function(err, rowCount, rows){
        var status = undefined;
        if(err){
            connection.close();
            status = err;
            callback(status)
        } else if (rowCount == 0){
            connection.close();
            status = "Invalid user";
            callback(status);
        }
        else {
            connection.close();
            status = "success";
            callback(status, rowCount, rows)
        }
    });
    request.on('row', function(columns){
        columns.forEach(function(column){
        })
    });

    var connection = new Connection(config);
    connection.on('connect', function(err) {
        if (err) return console.error(err);
        connection.execSql(request);
    });

};

var getUserById = function(userId, callback){
    var requestString = "select * from users where id='" + userId +"';"

    var request = new Requeset(requestString, function(err, rowCount, rows){
        var status = undefined;
        if(err){
            connection.close();
            status = err;
            callback(status, rowCount, rows)
        } else {
            connection.close();
            status = "success";
            callback(status, rowCount, rows)
        }
    });

    var connection = new Connection(config);
    connection.on('connect', function(err){
        if (err) callback(err);
        connection.execSql(request);
    });
};



module.exports = {
    createUser: createUser,
    checkUserName: checkUserName,
    getUserByUserName: getUserByUserName,
    getUserById: getUserById
};