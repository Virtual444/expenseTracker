const Sequelize = require('sequelize');

const sequilize = new Sequelize ('expense_tracker', 'root', '0000' , {
    dialect:'mysql',
    host: 'localhost',
    logging: console.log,


});

module.exports = sequilize;
