const express = require('express');
const bodyParser = require('body-parser');
const UsersModel = require('../models/usersModel');
const router = express.Router();


/**
* Users - Add new user
* @api public - auth not required (for testing purposes)
* @method POST
* 
* @param {String} name
* @param {String} authorization
* @param {String} deviceToken
* @param {String} fingerPrint
*/
router.post('/addUser', bodyParser.json(), (req, res) => {
    UsersModel.addNewUser({
        name: req.body.name,
        authorization: req.body.authorization,
        deviceToken: req.body.deviceToken,
        fingerPrint: req.body.fingerPrint
    }, (err, data) => {
        if (err) {
            res.json('An error occured while saving new user');
        } else {
            const msg = {
                statusCode: res.statusCode,
                message: 'User added successfully',
                data
            };
            res.json(msg);
        }
    });
});

module.exports = router;
