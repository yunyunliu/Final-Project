const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');
const Card = require('./card');
const Tag = require('./tag');

const options = {
  tableName: 'TagsCards',
  timestamps: true
};

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
}, options);

module.exports = TagCard;
