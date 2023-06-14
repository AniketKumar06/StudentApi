
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const routes = require('./routes/student.js');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(morgan('dev'));

//Include body parser
app.use(express.json());
app.use(express.json({
    extended: true
}))

app.use('/api', routes);

const PORT = process.env.PORT;

app.listen(PORT,
    console.log(`Server is running on port ${PORT}`.blue.underline))