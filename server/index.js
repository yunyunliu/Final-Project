require('dotenv/config');
const pg = require('pg');
const express = require('express');

const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const columns = require('./controllers/columns');
const boards = require('./controllers/boards');
const cards = require('./controllers/cards');
const tags = require('./controllers/tags');

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

// get formatted data of all cols and cards associated with boardId
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

app.post('/api/columns', (req, res) => {
  columns.create(req, res, db);
});

app.delete('/api/columns/:colId', (req, res) => {
  columns.delete(req, res, db);
});

app.put('/api/columns/:colId', async (req, res) => {
  columns.edit(req, res, db);
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

app.delete('/api/users/:id/boards/:boardId/col/:colId/cards/:cardId', (req, res) => {
  cards.deleteCard(req, res, db);
});

app.put('/api/users/:id/boards/:boardId/col/:colId/cards/:cardId', (req, res) => {
  try {
    cards.update(req, res, db);
  } catch (err) {
    console.error('error:', err.message);
    res.status(500).send({ error: 'something went wrong' });
  }
});

app.delete('/api/users/:id/boards/:boardId/col/:colId/cards/:cardId/remove/:tagId', async (req, res) => {
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
app.get('/api/users/:id/boards/:boardId/col/:colId/cards/:cardId/tags', (req, res) => {
  tags.get(req, res, db);
});

app.post('/api/users/:id/boards/:boardId/col/:colId/cards/:cardId/tags', (req, res) => {
  tags.create(req, res, db);
});

app.delete('/api/users/:id/boards/:boardId/tags/:tagId', async (req, res) => {
  const { tagId } = req.params;
  const sqlRel = `
  DELETE FROM "tagsCards"
    WHERE "tagId" = $1
  `;
  const sql = `
  DELETE FROM "tags"
    WHERE "tagId" = $1
  `;
  try {
    await db.query(sqlRel, [tagId]);
    await db.query(sql, [tagId]);
    res.sendStatus(204);
  } catch (err) {
    res.send(err.message);
    console.error('error:', err.message);
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
