var http = require('http');

var options = {
    host: 'api.yummly.com',
    path: '/v1/api/recipes?_app_id=530cab32&_app_key=b20aff85e4721c30bed0b555397494d4&maxResult=10&start=1'
};

var getAll = function(callback){
    sendRequest(function(results){
        callback(results);
    });
}

var getOne = function(request, callback){
    var searchString = parseSearch(request.params.searchterm);

    options.path = options.path + searchString;
    sendRequest(function(results){
        callback(results);
    });
}

var parseSearch = function(string){
    var stringArray = string.split(" ");
    var newString = stringArray.join("+");
    return "&q=" + newString;
}

var sendRequest = function(callback){
    var responseFunc = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            var test = JSON.parse(str);
            callback(test);
        });
    }
    http.request(options, responseFunc).end();
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};
