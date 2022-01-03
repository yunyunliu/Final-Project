const User = require('./user');
const Board = require('./board');
const Column = require('./column');
const Card = require('./card');
const Tag = require('./tag');
const TagCard = require('./tagCard');
const { sequelize } = require('../db');

sequelize.sync()
  .catch(err => { console.log('error from sequelize.sync:', err.message); }); // for each model, drop any existing table, then create new one
// one-to-many relationship
User.hasMany(Board);
Board.hasMany(Column);
Column.hasMany(Card);

// many-to-many
Tag.belongsToMany(Card, { through: TagCard });
Card.belongsToMany(Tag, { through: TagCard });

module.exports = { User, Board, Column, Card, Tag, TagCard };
