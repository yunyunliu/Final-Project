require('dotenv/config');
// const pg = require('pg');
const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const columns = require('./controllers/columns');
const boards = require('./controllers/boards');
const cards = require('./controllers/cards');

// let db;
// if (process.env.NODE_ENV === 'production') {
//   db = new pg.Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new pg.Pool({
//     connectionString: process.env.DATABASE_URL
//   });
// }

const app = express();
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
const staticMiddleware = express.static(publicPath);
app.use(staticMiddleware);

async function main() {
  const board = await prisma.boards.findUniqueOrThrow({
    where: { boardId: 3 },
    include: {
      columns: {
        include: {
          cards: true
        }
      }
    }
  });
  console.log(board.columns[0].cards);
}

main();
// boards

app.get('/api/users/:id/boards', (req, res) => {
  try {
    boards.get(req, res);
  } catch (err) {
    console.error('error:', err);
    res.send({ error: 'server error' });
  }
});

app.post('/api/users/:id/boards', (req, res) => {
  boards.create(req, res);
});

// get formatted data of all cols and cards associated with boardId
app.get('/api/users/:userId/boards/:boardId', (req, res) => {
  boards.getOne(req, res);
});

app.delete('/api/users/:id/boards/:boardId', (req, res) => {
  boards.delete(req, res);
});

app.put('/api/users/:id/boards/:boardId', (req, res) => {
  boards.edit(req, res);
});

app.put('/api/boards/:boardId/columns', (req, res) => {
  boards.editColumnOrder(req, res);
});

// columns

app.get('/api/users/:id/boards/:boardId/col', (req, res) => {
  columns.get(req, res);
});

app.post('/api/columns', (req, res) => {
  columns.create(req, res);
});

app.delete('/api/columns/:colId', (req, res) => {
  columns.delete(req, res);
});

app.put('/api/columns/:colId', (req, res) => {
  columns.edit(req, res);
});

app.put('/api/columns/:colId/cards', (req, res) => {
  columns.editCardOrder(req, res);
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
