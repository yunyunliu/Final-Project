const { sequelize } = require('./server/database/db');
const { User, Board, Column, Card, Tag } = require('./server/database/models');

const users = [{ name: 'test', password: 'pass', email: 'test@test.com' }];

const boards = [{ name: 'typescript project' }, { name: 'code journal' }, { name: 'blog app' }];

const columns3 = [{ name: 'todos'}, {  name: 'in progress' }, { name: 'done' }];
const columns2 = [{ name: 'pending'}, { name: 'wip'}, { name: 'under review'}, { name: 'complete' }];

const tags = [
  { color: 'yellow', text: 'refactor' },
  { color: 'red', text: 'bug' },
  { color: 'green', text: 'feature' },
  { color: 'research needed', text: 'blue' },
  { color: 'pink', text: 'database' },
  { color: 'light-blue', text: 'UI/CSS' },
  { color: 'gray', text: 'server' },
  { color: 'orange', text: 'testing' },
  { color: 'purple', text: 'HTML' },
];

const cards1 = [ // cards in col 1
  {
    name: 'style confirm modal',
    description: 'use a div with position:fixed',
    sequenceNum: 0
  },
  {
    name: 'add react context',
    description: 'decide what contexts are needed and where to put provider components',
    sequenceNum: 1
  },
  {
    name: 'implement drag and drop',
    description: 'research html drag and drop api',
    sequenceNum: 2
  }

];

const cards2 = [
  {
    name: 'create endpoints',
    description: '',
    sequenceNum: 0
  },
  {
    name: 'change buttons in EditForm and AddForm to type submit',
    description: 'need to be type submit for required boolean attribute to work',
    sequenceNum: 1
  },
  {
    name: 'create Notification component for displaying error message',
    description: '',
    sequenceNum: 2
  }
];

const cards3 = [
  {
    name: 'trap focus on modals',
    description: 'do I need a library? focus-trap library?',
    sequenceNum: 0
  }
];

const addTags = async () => {
  try {
    await Tag.destroy({ truncate: true, cascade: true });
    await Tag.bulkCreate(tags);
    console.log('tag data added');
  } catch(err) {
    console.log('error:', err);
  }
};

const addUsers = async () => {
  try {
    await User.destroy({ truncate: true, cascade: true });
    console.log('records deleted');
    await User.bulkCreate(users)
    console.log('user data added');
  } catch (err) {
    console.log('error:', err);
  }
};

const addBoards = () => {
  try {
    await Board.destroy({ truncate: true, cascade: true });
    console.log('records deleted');
    await Board.bulkCreate()
  } catch (err) {
    console.log('error:', err);
  }

}


// result data is at dbResponse.dataValues;
addTags();
