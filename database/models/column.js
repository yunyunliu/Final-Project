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
    allowNull: false
  }
});

module.exports = Column;
