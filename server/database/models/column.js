const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Column = sequelize.define('Column', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.TEXT,
    defaultValue: 'New Column'
  }
}, { timestamps: true, autoIncrement: 8 });

module.exports = Column;
