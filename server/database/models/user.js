const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const { sequelize } = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: true });

module.exports = User;
