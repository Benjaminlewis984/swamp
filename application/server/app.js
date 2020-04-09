var databaseManager = require('./database/database-manager.js');
databaseManager.connect();

var cors = require("cors");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var fileUpload = require('express-fileupload');

var app = express();
app.use(cors());

var indexRouter = require('./routes/index');
var addUserRouter = require('./routes/Users/addUser');
var verifyUserRouter = require('./routes/Users/verifyUser');
var uploadFileRouter = require('./routes/Media/uploadFile');
var signOutRouter = require('./routes/Users/signOut');
var banUserRouter = require('./routes/Users/banUser');
var approveMediaRouter = require('./routes/Media/approveMedia');
var downloadMediaRouter = require('./routes/Media/downloadMedia');
var browseMediaRouter = require('./routes/Media/browseMedia');
var documentationRouter = require('./routes/documentation');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'very hyper super duper long random string',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'media/preview')));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use(indexRouter);
app.use(addUserRouter);
app.use(verifyUserRouter);
app.use(uploadFileRouter);
app.use(signOutRouter);
app.use(banUserRouter);
app.use(approveMediaRouter);
app.use(downloadMediaRouter);
app.use(browseMediaRouter);
app.use(documentationRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;