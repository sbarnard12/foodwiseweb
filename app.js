var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');
var session = require('client-sessions');


//define route or import route file 
var index = require('./routes/index');
var users = require('./routes/users');
var searchRecipes = require('./routes/searchRecipes');
var viewSales = require('./routes/viewSales');
var homeIngredients = require('./routes/homeIngredients');
var setPreferences = require('./routes/setPreferences');
var recipe = require('./routes/recipeRoute');
var login = require('./routes/loginRoute');
var signup = require('./routes/signUpRoute');
var logout = require('./routes/logoutRoute');

var app = express();

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

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here_to_encrypt',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));
var userService = require('./Services/userService.js');
app.use(function(req, res, next){
    userService.getUser(req,res,next);
});

function requireLogin(req, res, next){
    if(req.user || req.path === '/login' || req.path === '/signup'){
        next();
    } else {
        res.redirect('/login');
    }
}


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap-sass/assets/fonts')));
app.use(requireLogin);

//route destinations
app.use('/', index);
app.use('/users', users);
app.use('/searchRecipes', searchRecipes);
app.use('/viewSales', viewSales);
app.use('/homeIngredients', homeIngredients);
app.use('/setPreferences', setPreferences);
app.use('/recipes', recipe);
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);

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
