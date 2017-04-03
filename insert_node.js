/*
Huzaifa Galely: 20470427
*/
var fetch = require('node-fetch');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var JSONObj='';
var price='';

//npm install JSON2 --save
fetch('http://nofrills-api.herokuapp.com/api/v0/flyers/192').then(function(res) {
    return res.json();
}).then(function(json) {
    JSONObj = json;
}).then(function() {
    insert();
});

var config = {
    userName: 'foodwise2_admin@foodwise2',
    password: 'Syde322password',
    server: 'foodwise2.database.windows.net',
    options: {encrypt: true, database: 'foodwise2'}
};

function clean (str) {
    var re=/.[A-Za-z](.*?)$/g;
    var re2=/.+\//g;
    return rev2=parseFloat((str.replace(re,'')).replace(re2,''));
}

var insert = function() {
    deletedatabase(function(status) {
        if(status == "success"){
            resetIDs (function (status) {
                if(status == "success") {
                    insertIntoDataBase(function (status) {

                    })
                }
            })
        }
    });
}

var resetIDs = function (callback) {
    //console.log("Deleting the brand new product in database...");
    request = new Request("DBCC CHECKIDENT ('saleItems', RESEED, 0)", function(err, rowCount, rows) {
        if (err) callback(err);
        else {
            connection3.close();
            callback("success");
            //console.log(rowCount + ' row(s) returned');
        }
    });

    var connection3 = new Connection(config);
    connection3.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 3");
        connection3.execSql(request);
    });
}

var deletedatabase = function (callback) {
    //console.log("Deleting the brand new product in database...");
    request = new Request("delete from saleItems", function(err, rowCount, rows) {
        if (err) callback(err);
        else {
            connection1.close();
            callback("success");
            console.log(rowCount + ' row(s) returned');
        }
    });

    var connection1 = new Connection(config);
    connection1.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 1");
        connection1.execSql(request);
    });
}

var insertIntoDataBase = function(callback) {
    number_of_items = JSONObj.products.length;
    // instantiate - provide the table where you'll be inserting to, and a callback
    var connection2 = new Connection(config);
    var bulkLoad = connection2.newBulkLoad('saleItems', function (error, rowCount2) {
        if (error) callback(error);
        else {
            connection2.close();
            callback("success");
            console.log('inserted %d rows', rowCount2);
        }
    });

// setup your columns - always indicate whether the column is nullable
    bulkLoad.addColumn('storeId', TYPES.Int, {nullable: false});
    bulkLoad.addColumn('productTitle', TYPES.VarChar, {length: 255, nullable: false});
    bulkLoad.addColumn('priceString', TYPES.Float, {nullable: true});
    bulkLoad.addColumn('itemDescription', TYPES.VarChar, {length: 255, nullable: false});

// add rows
    var i = 0;
    for (i = 0; i < number_of_items; i++ ) {
        price=clean(JSONObj.products[i].priceString);
        bulkLoad.addRow({storeId: 1, productTitle: JSONObj.products[i].productTitle, priceString: price, itemDescription: JSONObj.products[i].description});
    }

// execute
    connection2.on('connect', function(err) {
        if (err) return console.error(err);
        console.log("Connected 2");
        connection2.execBulkLoad(bulkLoad);
    });
}