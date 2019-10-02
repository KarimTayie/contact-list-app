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
ContactsSchema.plugin(mongoosePaginate);

// Register contacts model
const ContactsModel = mongoose.model('contacts', ContactsSchema);

ContactsModel.addNewContact = (contactData, cb) => {
    const contact = new ContactsModel(contactData);
    contact.save((err, db) => {
        cb(err, db);
    });
};

ContactsModel.getAllUserContacts = (userId, pageNum, cb) => {
    ContactsModel.paginate({userId}, {page: pageNum, limit: 5},
        (err, db) => {
            cb(err, db);
        });
};

ContactsModel.getRecentContacts = (userId, cb) => {
    ContactsModel.find({userId}, {}, {sort: {time: -1}, limit: 5},
        (err, db) => {
            cb(err, db);
        });
};

module.exports = ContactsModel;
