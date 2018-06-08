var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var branches = require('./routes/branches');
var catalog = require('./routes/catalog');
var contact=require('./routes/contact');
var app = express();
var login=false;
var user = "";
var currentUser = "";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/branches',branches);
app.use('/branches/createBranch',branches);
app.use('/branches/deleteBranch',branches);
app.use('/catalog',catalog);
app.use('/catalog/createFlower',catalog);
app.use('/catalog/deleteFlower',catalog);
app.use('/login',indexRouter);
app.use('/signUp',usersRouter);
app.use('/users/deleteUser',usersRouter);
app.use('/users/updateUser',usersRouter);
app.use('/contact',contact);
app.use('/logout',indexRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
