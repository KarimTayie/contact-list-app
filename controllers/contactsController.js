const express = require('express');
const bodyParser = require('body-parser');
const ContactsModel = require('../models/contactsModel');
const UsersModel = require('../models/usersModel');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * Contacts - Add New Contact
 * @api private - auth required
 * @method POST
 * 
 * @param {String} firstname
 * @param {String} lastname
 * @param {String} email
 * @param {String} mobile
 * @param {String} userId
 */
router.post('/addContact', bodyParser.json(), authMiddleware, (req, res) => {
    const checkValid = UsersModel.isValidData(req.body);

    if (checkValid.case) {
        ContactsModel.addNewContact({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            userId: req.userId
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


/**
* Contacts - get all user contacts
* @api private - auth required
* @method POST
* 
* @param {String | Number} pageNum
* @param {String} userId
*/
router.post('/getList', bodyParser.json(), authMiddleware, (req, res) => {
    ContactsModel.getAllUserContacts(req.userId, req.body.pageNum,
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


/**
* Contacts - get recent contacts
* @api private - auth required
* @method POST
*
* @param {String} userId
*/
router.post('/getRecentList', bodyParser.json(), authMiddleware, (req, res) => {
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
