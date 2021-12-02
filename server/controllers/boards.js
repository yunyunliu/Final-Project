const { sql } = require('../boardDataQuery');

const boards = {
  get: async (req, res, db) => {
    const { id } = req.params;
    const sql = `
      SELECT *
          FROM "boards"
        WHERE "userId" = $1
        ORDER BY "createdAt" DESC;
    `;
    const params = [id];
    const result = await db.query(sql, params);
    res.json(result.rows);
  },
  // get all card, column, and board data for one board
  getOne: async (req, res, db) => {
    const { boardId } = req.params;
    try {
      const result = await db.query(sql, [boardId]);
      const [data] = result.rows;
      res.json(data);
    } catch (err) {
      res.send(err.message);
    }
  },
  create: async (req, res, db) => {
    const userId = req.params.id;
    const sql = `
      INSERT INTO "boards" ("userId", "name")
        VALUES ($1, 'New Project')
        RETURNING *
    `;
    const results = await db.query(sql, [userId]);
    const [data] = results.rows;
    res.status(201).json(data);
  },
  delete: async (req, res, db) => {
    const boardId = req.params.boardId;
    const sql = `
      DELETE FROM "boards"
        WHERE "boardId" = $1
    `;
    await db.query(sql, [boardId]);
    res.sendStatus(204);
  },
  edit: async (req, res, db) => {
    const { boardId } = req.params;
    const { name } = req.body;
    const sql = `
    UPDATE "boards"
        SET "name" = $1
      WHERE "boardId" = $2
      RETURNING *
    `;
    try {
      const result = await db.query(sql, [name, boardId]);
      const [updated] = result.rows;
      res.json(updated);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
      res.status(500).send(err.message);
    }

  }
};

module.exports = boards;
