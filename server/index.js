require('dotenv/config');
const pg = require('pg');
const express = require('express');

const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const columns = require('./controllers/columns');
const boards = require('./controllers/boards');
const cards = require('./controllers/cards');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json());
app.use(staticMiddleware);
app.use(errorMiddleware);
// boards

app.get('/api/users/:id/boards', (req, res) => {
  try {
    boards.get(req, res, db);
  } catch (err) {
    console.error('error:', err);
    res.send({ error: 'server error' });
  }
});

app.post('/api/users/:id/boards', (req, res) => {
  boards.create(req, res, db);
});

app.get('/api/users/:userId/boards/:boardId', (req, res) => {
  boards.getOne(req, res, db);
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

app.post('/api/users/:id/boards/:boardId/col', (req, res) => {
  columns.create(req, res, db);
});

app.delete('/api/users/:id/boards/:boardId/col/:colId', (req, res) => {
  columns.delete(req, res, db);
});

app.put('/api/users/:id/boards/:boardId/col/:colId', async (req, res) => {
  columns.edit(req, res, db);
});

// task cards

app.get('/api/users/:id/boards/:boardId/col/:colId/cards', (req, res) => {
  cards.getAll(req, res, db);
});

app.post('/api/users/:id/boards/:boardId/col/:colId/cards', (req, res) => {
  try {
    cards.create(req, res, db);
  } catch (err) {
    console.error('error:', err.message);
    res.status(500).send({ error: 'something went wrong' });
  }
});

app.delete('/api/users/:id/boards/:boardId/col/:colId/cards/:cardId', (req, res) => {
  cards.deleteCard(req, res, db);
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
