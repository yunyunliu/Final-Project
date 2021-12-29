const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');
const Card = require('./card');
const Tag = require('./tag');

const TagCard = sequelize.define('TagCard', {
  TagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tag,
      key: 'id'
    }
  },
  CardId: {
    type: DataTypes.INTEGER,
    references: {
      model: Card,
      key: 'id'
    }
  }
}, { tableName: 'TagsCards' });

module.exports = TagCard;
