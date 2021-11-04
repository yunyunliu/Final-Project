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

app.use(staticMiddleware);

app.use(errorMiddleware);

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT *
        FROM "boards"
      WHERE "userId" = $1;
  `;
  const params = [id];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
