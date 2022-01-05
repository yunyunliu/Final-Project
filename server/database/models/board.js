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
    defaultValue: 'New Project'
  }
}, { timestamps: true });

module.exports = Board;
