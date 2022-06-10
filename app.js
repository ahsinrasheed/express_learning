/* eslint-disable no-console */
/* eslint-disable import/extensions */
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');

const userRouter = require('./routes/userRoutes');

const app = express();

// MiddleWare
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount the Routes...
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//Server
module.exports = app;
