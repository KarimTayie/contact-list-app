const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

// Importing routes
const contactRouter = require('./controllers/contactsController');
const userRouter = require('./controllers/usersController');

// Setup morgan logger
app.use(morgan('tiny'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});

mongoose.connect('mongodb://localhost:27017/ContactList')
.then(() => {
    console.log('Connected to Database');
})
.catch((err) => {
    console.log(`Not Connected to Database ERROR! ${err}`);
});

fs.readdirSync(path.join(__dirname, 'models')).forEach((filename) => {
    require(`./models/${filename}`);
});

// Registering routes
app.use('/contacts', contactRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
