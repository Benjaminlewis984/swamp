const databaseManager = require('./database/database-manager.js');
databaseManager.connect();

const cors = require("cors");
const createError = require('http-errors');
const methodOverride = require('method-override');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(methodOverride('_method'));

const indexRouter = require('./routes/index');
const addUserRouter = require('./routes/Users/addUser');
const verifyUserRouter = require('./routes/Users/verifyUser');
const uploadFileRouter = require('./routes/Media/uploadFile');
const signOutRouter = require('./routes/Users/signOut');
const banUserRouter = require('./routes/Users/banUser');
const unbanUserRouter = require('./routes/Users/unbanUser');
const approveMediaRouter = require('./routes/Media/approveMedia');
const downloadMediaRouter = require('./routes/Media/downloadMedia');
const browseMediaRouter = require('./routes/Media/browseMedia');
const documentationRouter = require('./routes/documentation');
const cartRouter = require('./routes/ShoppingCart/cart');
const checkoutRouter = require('./routes/ShoppingCart/checkout');
const purchasesRouter = require('./routes/Media/purchases');
const listingsRouter = require('./routes/Media/listings');
const messageRouter = require('./routes/Message/messageUser');
const messageRequestRouter = require('./routes/Message/messageRequest');
const messageBoxRouter = require('./routes/Message/myMessages');
const profileRouter = require('./routes/Users/userProfile.js');
const analyticsRouter = require('./routes/Analytics/analytics.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'media/public')));
app.use(session({
  secret: 'very hyper super duper long random string',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 5
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use(indexRouter);
app.use(addUserRouter);
app.use(verifyUserRouter);
app.use(uploadFileRouter);
app.use(signOutRouter);
app.use(banUserRouter);
app.use(unbanUserRouter);
app.use(approveMediaRouter);
app.use(downloadMediaRouter);
app.use(browseMediaRouter);
app.use(documentationRouter);
app.use(cartRouter);
app.use(checkoutRouter);
app.use(purchasesRouter);
app.use(listingsRouter);
app.use(messageRouter);
app.use(messageRequestRouter);
app.use(messageBoxRouter);
app.use(profileRouter);
app.use(analyticsRouter);

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