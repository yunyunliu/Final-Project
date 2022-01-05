const User = require('./user');
const Board = require('./board');
const Column = require('./column');
const Card = require('./card');
const Tag = require('./tag');
const TagCard = require('./tagCard');
const { sequelize } = require('../db');

// one-to-many relationship
User.hasMany(Board);
Board.belongsTo(User);

Board.hasMany(Column);
Column.belongsTo(Board);

Column.hasMany(Card);
Card.belongsTo(Column);

// many-to-many
Tag.belongsToMany(Card, { through: TagCard });
Card.belongsToMany(Tag, { through: TagCard });

sequelize.sync({ alter: true })
  .catch(err => { console.log('error from sequelize.sync:', err.message); }); // for each model, drop any existing table, then create new one

module.exports = { User, Board, Column, Card, Tag, TagCard };
