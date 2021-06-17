
const Sequelize  = require('sequelize');
const db = require('./db');

const Address = db.define('address', {
    zipcode: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true
});

module.exports = Address;