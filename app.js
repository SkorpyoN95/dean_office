var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var student = require('./models/student');
var expr_sess = require('express-session');

passport.use('login', new Strategy({
  usernameField: 'email'
},
  function(email, password, done) {
    student.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  student.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/dean';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expr_sess({secret: 'e-dean-key'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', 
    passport.authenticate('login', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/main');
});

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
