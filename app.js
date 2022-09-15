var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var winston = require('winston');
var logger = require('morgan');

// const winstonLogger = winston.createLogger({
let winstonConfigs = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
};

if (process.env.ENV !== 'production'){
  winstonConfigs.transports.push(
    new winston.transports.Console()
  )
};
winston.loggers.add('primary',);

var winstonLogger = winston.loggers.get('primary');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRouter');
var authRouter = require('./routes/authRouter');
var subjectRouter = require('./routes/subjectRouter');
var trainingRouter = require('./routes/trainingRouter');

var dataConsolidate = require('./middleware/dataMiddleware');

const {connectDB} = require('./config/db');
connectDB();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(dataConsolidate);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  // winstonLogger.info({this:"is an object"})
  next()
})

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/training', trainingRouter);
app.use('/subject', subjectRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // console.log(err);
  winstonLogger.error(JSON.stringify(err))
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Internal Server Error")
});

module.exports = app;
