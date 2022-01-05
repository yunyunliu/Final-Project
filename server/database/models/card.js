const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  sequenceNum: {
    type: DataTypes.INTEGER
  }
}, { timestamps: true });

module.exports = Card;
