const User = require('./user');
const Board = require('./board');
const Column = require('./column');
const Card = require('./card');
const Tag = require('./tag');
const TagCard = require('./tagCard');

User.sync();

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
