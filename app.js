const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Controllers
const contactRouter = require('./controllers/contactsController');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});

fs.readFileSync(path.join(__dirname, 'models')).forEach((filename) => {
    require(`./models/${filename}`);
});

app.use('/contacts', contactRouter);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
