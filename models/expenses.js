const Sequelize =require('sequelize');

const sequelize = require ("../util/database");


const Expense = sequelize.define('Expense', {
    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    
   
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    amount: {
        type: Sequelize.FLOAT,
        allowNull:false
    }, 

    



});




module.exports = Expense;