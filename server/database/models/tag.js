const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  color: {
    type: DataTypes.TEXT
  },
  text: {
    type: DataTypes.TEXT
  }
}, { timestamps: true });

module.exports = Tag;
