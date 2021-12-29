const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Board = sequelize.define('Board', {
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

module.exports = Board;
