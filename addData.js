const { sequelize } = require('./server/database/db');
const { User, Board, Column, Card, Tag, TagCard } = require('./server/database/models');

const users = [{ name: 'test', password: 'pass', email: 'test@test.com', id: 1 }];

const boards = [{ name: 'typescript project', id: 1, UserId: 1 }, { name: 'code journal', id: 2, UserId: 1 }, { name: 'blog app', id: 3, UserId: 1 }];

const columns = [
  { name: 'todos', id: 1, BoardId: 3 },
  { name: 'in progress', id: 2, BoardId: 3 },
  { name: 'done', id: 3, BoardId: 3 },
  { name: 'pending', id: 4, BoardId: 2 },
  { name: 'wip', id: 5, BoardId: 2 },
  { name: 'under review', id: 6, BoardId: 2 },
  { name: 'complete', id: 7, BoardId: 2 }
];

const tags = [
  { color: 'yellow', text: 'refactor', id: 1 },
  { color: 'red', text: 'bug', id: 2 },
  { color: 'green', text: 'feature', id: 3 },
  { color: 'research needed', text: 'blue', id: 4 },
  { color: 'pink', text: 'database', id: 5 },
  { color: 'light-blue', text: 'UI/CSS', id: 6 },
  { color: 'gray', text: 'server', id: 7 },
  { color: 'orange', text: 'testing', id: 8 },
  { color: 'purple', text: 'HTML', id: 9 }
];

const cards = [
  {
    title: 'style confirm modal',
    description: 'use a div with position:fixed',
    sequenceNum: 0,
    id: 1,
    ColumnId: 1,
    BoardId: 3
  },
  {
    title: 'add react context',
    description: 'decide what contexts are needed and where to put provider components',
    sequenceNum: 1,
    id: 2,
    ColumnId: 1,
    BoardId: 3
  },
  {
    title: 'implement drag and drop',
    description: 'research html drag and drop api',
    sequenceNum: 2,
    id: 3,
    ColumnId: 1,
    BoardId: 3
  },
  {
    title: 'create endpoints',
    description: '',
    sequenceNum: 0,
    id: 4,
    ColumnId: 2,
    BoardId: 3
  },
  {
    title: 'change buttons in EditForm and AddForm to type submit',
    description: 'need to be type submit for required boolean attribute to work',
    sequenceNum: 1,
    id: 5,
    ColumnId: 2,
    BoardId: 3
  },
  {
    title: 'create Notification component for displaying error message',
    description: '',
    sequenceNum: 2,
    id: 6,
    ColumnId: 2,
    BoardId: 3
  },
  {
    title: 'trap focus on modals',
    description: 'do I need a library? focus-trap library?',
    sequenceNum: 0,
    id: 7,
    ColumnId: 3,
    BoardId: 3
  }
];

const tagsOnCards = [
  { CardId: 1, TagId: 1, id: 1 },
  { CardId: 1, TagId: 2, id: 2 },
  { CardId: 2, TagId: 3, id: 3 },
  { CardId: 2, TagId: 4, id: 4 },
  { CardId: 3, TagId: 5, id: 5 },
  { CardId: 1, TagId: 6, id: 6 },
  { CardId: 6, TagId: 6, id: 7 },
  { CardId: 7, TagId: 4, id: 8 },
  { CardId: 7, TagId: 6, id: 9 }
];

const addTags = async () => {
  try {
    await Tag.destroy({ truncate: true, cascade: true });
    await Tag.bulkCreate(tags);
    console.log('tag data added');
  } catch (err) {
    console.log('error @ addTags:', err);
  }
};

const addUsers = async () => {
  try {
    await User.destroy({ truncate: true, cascade: true });
    await User.bulkCreate(users);
    console.log('user data added');
  } catch (err) {
    console.log('error @ addUsers:', err);
  }
};

const addBoards = async () => {
  try {
    await Board.destroy({ truncate: true, cascade: true });
    await Board.bulkCreate(boards);
    console.log('board data added');
  } catch (err) {
    console.log('error @ addBoards:', err);
  }
};

const addColsCardsRels = async () => {
  try {
    await Column.destroy({ truncate: true, cascade: true });
    await Card.destroy({ truncate: true, cascade: true });
    await TagCard.destroy({ truncate: true, cascade: true });
    await Column.bulkCreate(columns);
    await Card.bulkCreate(cards);
    await TagCard.bulkCreate(tagsOnCards);
    console.log('col, card, rel data added');
  } catch (err) {
    console.log('error @ addColsCardsRels:', err);
  }
};

// result data is at dbResponse.dataValues;
addUsers();
addTags();
addBoards();
addColsCardsRels();
