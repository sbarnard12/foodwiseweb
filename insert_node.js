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
//fetch('http://api.tvmaze.com/shows').then(function(res) {
    return res.json();
}).then(function(json) {
    //jsonObj=JSON.parse(json);
    //console.log(json);
	JSONObj=json;
    //console.log(json.products[0].productTitle);
    //console.log("HELLO");
});

var config = {
    //userName: 'foodwise2_admin@foodwise2.database.windows.net',
    //password: 'Syde322password',
    //server: 'foodwise2.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    //options: {encrypt: true, database: 'AdventureWorks'}

    userName: 'foodwise2_admin@foodwise2',
    password: 'Syde322password',
    server: 'foodwise2.database.windows.net',
    // When you connect to Azure SQL Database, you need these next options.
    options: {encrypt: true, database: 'foodwise2'}
};

var connection2 = new Connection(config);
connection2.on('connect', function(err) {
    if (err) return console.error(err);
    console.log("Connected 2");
    executeStatement1();
});

//Insert into saleItems (storeId,productTitle,priceString,itemDescription)
function executeStatement1() {
	number_of_items=JSONObj.products.length;
    //console.log(JSONObj.products[0].productTitle);
    //console.log(JSONObj.products[0].priceString);
    //console.log(JSONObj.products[0].description);
    //console.log(number_of_items);
// instantiate - provide the table where you'll be inserting to, and a callback
    var bulkLoad = connection2.newBulkLoad('saleItems', function (error, rowCount2) {
        if (error) return console.error(error);
        console.log('inserted %d rows', rowCount2);
    });

// setup your columns - always indicate whether the column is nullable
    bulkLoad.addColumn('storeId', TYPES.Int, {nullable: false});
    bulkLoad.addColumn('productTitle', TYPES.VarChar, {length: 255, nullable: false});
    bulkLoad.addColumn('priceString', TYPES.Float, {nullable: true});
    bulkLoad.addColumn('itemDescription', TYPES.VarChar, {length: 255, nullable: false});

// add rows
	var i=0;
	for (i=0; i<number_of_items; i++ ) {
	    price=clean(JSONObj.products[i].priceString);
        bulkLoad.addRow({storeId: 1, productTitle: JSONObj.products[i].productTitle, priceString: price, itemDescription: JSONObj.products[i].description});
    }

// execute
    connection2.execBulkLoad(bulkLoad);
}

function clean (str) {
    var re=/.[A-Za-z](.*?)$/g;
    var re2=/.+\//g;
    return rev2=parseFloat((str.replace(re,'')).replace(re2,''));
}