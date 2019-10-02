const mongoose = require('mongoose');
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
    const user = new UsersModel.model(userData);
    user.save((err, db) => {
        cb(err, db);
    });
}

module.exports = UsersModel;
