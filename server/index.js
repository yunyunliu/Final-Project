require('dotenv/config');
const express = require('express');
const path = require('path');
const { User, Board, Column, Card, Tag, TagCard } = require('./database/models');

// const columns = require('./controllers/columns');
// const boards = require('./controllers/boards');
// const cards = require('./controllers/cards');
const { connectDb } = require('./database/db');

const app = express();
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
const staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);

const startApp = async () => {
  await connectDb(); // make sure database connected, before starting server
  app.listen(process.env.PORT, () => {
    console.log(`express server listening on port ${process.env.PORT}`);
  });
};

startApp();

// boards

app.get('/api/users/:id/boards', async (req, res) => {
  const userId = req.params.id;
  const options = {
    order: [
      ['id', 'DESC']
    ],
    where: {
      UserId: userId
    }
  };
  try {
    const boards = await Board.findAll(options);
    res.json(boards);
  } catch (err) {
    console.error('error:', err.message);
    res.send({ error: 'server error' });
  }
});

app.post('/api/users/:id/boards', async (req, res) => {
  const userId = req.params.id;
  try {
    const newBoard = await Board.create({ UserId: userId });
    res.json(newBoard);
  } catch (err) {
    console.error('error creating board:', err);
    res.send({ error: 'server error' });
  }
});

// get formatted data of all cols and cards associated with boardId
app.get('/api/users/:userId/boards/:boardId', async (req, res) => {
  const boardId = req.params.boardId;
  try {
    const boardData = await Board.findOne({
      where: {
        id: boardId
      }
    });
    res.json(boardData);
  } catch (err) {
    console.error(`error fetching data for board ${boardId}`, err);
    res.send({ error: 'server error' });
  }

});

app.delete('/api/users/:id/boards/:boardId', (req, res) => {
  boards.delete(req, res, db);
});

app.put('/api/users/:id/boards/:boardId', async (req, res) => {
  boards.edit(req, res, db);
});

// columns

app.get('/api/users/:id/boards/:boardId/col', (req, res) => {
  columns.get(req, res, db);
});

app.post('/api/columns', (req, res) => {
  columns.create(req, res, db);
});

app.delete('/api/columns/:colId', (req, res) => {
  columns.delete(req, res, db);
});

app.put('/api/columns/:colId', (req, res) => {
  columns.edit(req, res, db);
});

app.put('/api/columns/:colId/cards', (req, res) => {
  columns.editCardOrder(req, res, db);
});
// task cards

app.get('/api/users/:id/boards/:boardId/col/:colId/cards', (req, res) => {
  cards.getAll(req, res, db);
});

app.post('/api/cards', (req, res) => {
  try {
    cards.create(req, res, db);
  } catch (err) {
    console.error('error:', err.message);
    res.status(500).send({ error: 'something went wrong' });
  }
});

app.delete('/api/cards/:cardId', (req, res) => {
  cards.deleteCard(req, res, db);
});

app.put('/api/cards/:cardId', (req, res) => {
  try {
    cards.update(req, res, db);
  } catch (err) {
    console.error('error:', err.message);
    res.status(500).send({ error: 'something went wrong' });
  }
});

app.delete('/api/cards/:cardId/remove/:tagId', async (req, res) => {
  const { tagId, cardId } = req.params;
  const sql = `
  DELETE FROM "tagsCards"
  WHERE "tagId" = $1 AND "cardId" = $2
  `;
  try {
    await db.query(sql, [tagId, cardId]);
    res.sendStatus(204);
  } catch (err) {
    res.send(err.message);
    console.error(err.message);
  }
});

// tags
app.get('/api/tags/', async (req, res) => {
  const sql = `
    SELECT *
      FROM "tags"
  `;
  try {
    const result = await db.query(sql);
    const tags = result.rows;
    res.json(tags);
  } catch (err) {
    res.status(500).send('error');
    console.error('error:', err.message);
  }
});

app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});
