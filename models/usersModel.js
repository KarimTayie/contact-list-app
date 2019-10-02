const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

// Create users schema
const UsersSchema = new Schema({
    authorization: String,
    deviceToken: String,
    fingerPrint: String,
    name: String
});

// Register users model
const UsersModel = mongoose.model('users', UsersSchema);

UsersModel.addNewUser = (userData, cb) => {
    const user = new UsersModel(userData);
    user.save((err, db) => {
        cb(err, db);
    });
};

UsersModel.findUser = (userData, cb) => {
    UsersModel.findOne(userData,
        (err, db) => {
            cb(err, db);
        });
};

/**
 * validing users model data
 */
UsersModel.isValidData = (data) => {
    const response = { case: true, error: [] };

    if (!validator.isEmail(data.email)) {
        response.case = false;
        response.error.push({
            target: 'email',
            message: 'email isn\'t valid'
        })
    }

    if (!validator.isAlpha(data.firstname)) {
        response.case = false;
        response.error.push({
            target: 'firstname',
            message: 'firstname isn\'t valid'
        })
    }
        
    if (!validator.isAlpha(data.lastname)) {
        response.case = false;
        response.error.push({
            target:'lastname',
            message: 'lastname isn\'t valid'
        });
    }

    return response;
};

module.exports = UsersModel;
