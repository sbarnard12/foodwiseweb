var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');


//define route or import route file 
var index = require('./routes/index');
var users = require('./routes/users');
var searchRecipes = require('./routes/searchRecipes');
var viewSales = require('./routes/viewSales');
var homeIngredients = require('./routes/homeIngredients');
var setPreferences = require('./routes/setPreferences');
var flyer = require('./routes/flyerRouteTest');

var app = express();

require('./db/models');

// view engine setup
app.engine('hbs', exphbs({extname: '.hbs', defaultLayout: 'layout'}));
 app.set('view engine', 'hbs');
 app.use (
   sassMiddleware({
     src: __dirname + '/sass',
     dest: __dirname + '/public',
     // prefix: '/stylesheets',
     debug: true,
   })
 );
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap-sass/assets/fonts')));


//route destinations
app.use('/', index);
app.use('/users', users);
app.use('/searchRecipes', searchRecipes);
app.use('/viewSales', viewSales);
app.use('/homeIngredients', homeIngredients);
app.use('/setPreferences', setPreferences);
app.use('/flyer', flyer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
