const UsersModel = require('../models/usersModel');

/**
 * Auth middleware
 * Adds userId property to req if user exists
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const auth = (req, res, next) => {
    if (req.body) {
        UsersModel.findUser({
            authorization: req.body.authorization,
            deviceToken: req.body.deviceToken,
            fingerPrint: req.body.fingerPrint,
        }, (err, data) => {
            if (err) {
                res.json(`An error occured while getting user, error is ${err}`);
            } else {
                if (!data) {
                    res.json('The user is unauthorized');
                } else {
                    req.userId = data._id;
                    next();
                }
            }
        });
    } else {
        res.json('Body is empty');
    }
};

module.exports = auth;
