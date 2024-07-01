const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
});

module.exports = User;