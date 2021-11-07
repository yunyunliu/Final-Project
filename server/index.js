require('dotenv/config');
const pg = require('pg');
const express = require('express');

const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const columns = require('./controllers/columns');
const boards = require('./controllers/boards');
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
  boards.get(req, res, db);
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

app.post('/api/users/:id/boards/:boardId/col/:colId/cards', async (req, res) => {
  const { name, description } = req.body;
  const { colId, boardId } = req.params;
  const sql = `
    INSERT INTO "cards" ("name", "description", "columnId", "boardId")
      VALUES ($1, $2, $3, $4)
      RETURNING *
  `;
  const values = [name, description, colId, boardId];
  try {
    const result = await db.query(sql, values);
    const [newCard] = result.rows;
    res.status(201).json(newCard);
  } catch (err) {
    console.error('error:', err.message);
    res.status(500).send({ error: 'something went wrong' });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
