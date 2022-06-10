/* eslint-disable no-console */
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

// console.log(process.env);
// const DB = process.env.DATABASE.replace( '<PASSWORD>', process.env.DATABASE_PASSWORD);

const DBCon = process.env.DATABASE_LOCAL;

mongoose
  // .connect(DB, {
  .connect(DBCon, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB Connection Successful!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on the port ${port}...`);
});

// npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react  --save-dev
