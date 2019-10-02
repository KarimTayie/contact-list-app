const express = require('express');
const bodyParser = require('body-parser');
const ContactsModel = require('../models/contactsModel');
const UsersModel = require('../models/usersModel');
const router = express.Router();

router.post('/addContact', bodyParser.json(), (req, res) => {
    const checkValid = UsersModel.isValidData(req.body);

    if (checkValid.case) {
        ContactsModel.addNewContact({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            userID: req.userId
        },
        (err, data) => {
            if (err) {
                res.json(`An error occured while saving contact in database, error is ${err}`);
            } else {
                const msg = {
                    statusCode: res.statusCode,
                    message: 'Contact added successfully',
                    data
                };
                res.json(msg);
            }
        });
    } else {
        res.json(checkValid);
    }
});

router.post('/getList', bodyParser.json(), (req, res) => {
    ContactsModel.getAllUserContacts(req.userID, req.body.pageNum,
        (err, data) => {
            if (err) {
                res.json(`An error occured while getting all contacts from database, error is ${err}`);
            } else {
                const msg = {
                    statusCode: res.statusCode,
                    message: 'Get contacts list done successfully',
                    data
                };
                res.json(msg);
            }
        });
});

router.post('/getRecentList', bodyParser.json(), (req, res) => {
    ContactsModel.getRecentContacts(req.userId,
        (err, data) => {
            if (err) {
                res.json(`An error occured while getting all recent contacts from database, error is ${err}`);
            } else {
                const msg = {
                    statusCode: res.statusCode,
                    message: 'Get Recent Contacts done successfully',
                    data
                };
                res.json(msg);
            }
        });
});

module.exports = router;
