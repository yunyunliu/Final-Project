require('dotenv/config');
const pg = require('pg');
const express = require('express');

const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
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
  const { id } = req.params;
  const sql = `
    SELECT *
        FROM "boards"
      WHERE "userId" = $1
      ORDER BY "createdAt" ASC;
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    });
});

app.post('/api/users/:id/boards', async (req, res) => {
  const userId = req.params.id;
  const sql = `
    INSERT INTO "boards" ("userId", "name")
      VALUES ($1, 'New Project')
      RETURNING *
  `;
  const values = [userId];
  const results = await db.query(sql, values);
  const [data] = results.rows;
  res.status(201).json(data);
});

app.get('/api/users/:userId/boards/:boardId', async (req, res) => {
  const board = Number(req.params.boardId);
  const user = Number(req.params.userId);
  const sql = `
  SELECT *
    FROM "boards"
  WHERE "boardId" = $1 AND "userId" = $2
  `;
  const values = [board, user];
  const results = await db.query(sql, values);
  const [data] = results.rows;
  res.json(data);
});

app.delete('/api/users/:id/boards/:boardId', async (req, res) => {
  const boardId = req.params.boardId;
  const sql = `
    DELETE FROM "boards"
      WHERE "boardId" = $1
  `;
  const values = [boardId];
  await db.query(sql, values);
  res.sendStatus(204);
});

app.put('/api/users/:id/boards/:boardId', async (req, res) => {
  const boardId = Number(req.params.boardId);
  const body = req.body;
  const sql = `
  UPDATE "boards"
      SET "name" = $1
    WHERE "boardId" = $2
    RETURNING *
  `;
  const values = [body.name, boardId];
  const result = await db.query(sql, values);
  const [updated] = result.rows;
  res.json(updated);
});

// columns

app.get('/api/users/:id/boards/:boardId/col', async (req, res) => {
  const { boardId } = req.params;
  const sql = `
    SELECT *
      FROM "columns"
    WHERE "boardId" = $1
  `;
  const values = [boardId];
  const result = await db.query(sql, values);
  const data = result.rows;
  res.json(data);
});

app.post('/api/users/:id/boards/:boardId/col', async (req, res) => {
  const sql = `
  INSERT INTO "columns" ("boardId", name)
    VALUES (12, 'New Column')
    RETURNING *
`;
  const results = await db.query(sql);
  const [data] = results.rows;
  res.status(201).json(data);
});

app.delete('/api/users/:id/boards/:boardId/col/:colId', async (req, res) => {
  const { colId } = req.params;
  const sql = `
    DELETE from "columns"
      WHERE "columnId" = $1
  `;
  const val = [colId];
  await db.query(sql, val);
  res.sendStatus(204);
});

app.put('/api/users/:id/boards/:boardId/col/:colId', async (req, res) => {
  const { colId } = req.params;
  const sql = `
    UPDATE "columns"
        SET "name" = $1
      WHERE "columnId" = $2
    RETURNING *
  `;
  const values = [req.body.name, colId];
  try {
    const result = await db.query(sql, values);
    const [record] = result.rows;
    res.json(record);
  } catch (err) {
    console.error('error:', err.message);
    res.status(500).send({ error: 'something went wrong' });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
