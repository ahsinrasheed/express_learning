/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MiddleWare

// Set Security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, Please try again in an hour!',
});
app.use('/api', limiter);

// BODY Parser, Reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Serving Static FIles
app.use(express.static(`${__dirname}/public`));

// Test MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// Mount the Routes...
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Router Handler

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// global error Handling
app.use(globalErrorHandler);

module.exports = app;
