const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/stacksource-zipcode', {
    logging: false
});



module.exports = db; 