const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

// Create contacts schema
const ContactsSchema = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

// For pagination purposes
contacts.plugin(mongoosePaginate);

// Register contacts model
const ContactsModel = mongoose.model('contacts', ContactsSchema);

ContactsModel.addNewContact = (contactData, cb) => {
    const contact = new ContactsModel.model(contactData);
    contact.save((err, db) => {
        cb(err, db);
    });
};

ContactsModel.getAllList = (userId, pageNum, cb) => {
    ContactsModel.model.paginate({userId}, {page: pageNum, limit: 5},
        (err, db) => {
            cb(err, db);
        });
};

ContactsModel.getRecentList = (userId, cb) => {
    ContactsModel.model.find({userId}, {}, {sort: {time: -1}, limit: 5},
        (err, db) => {
            cb(err, db);
        });
};

module.exports = ContactsModel;
