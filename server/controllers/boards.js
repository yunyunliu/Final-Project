const { sql } = require('../boardDataQuery');

const boards = {
  get: async (req, res, db) => {
    const { id } = req.params;
    const sql = `
      SELECT *
          FROM "boards"
        WHERE "userId" = $1
        ORDER BY "createdAt" ASC;
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
    const boardId = Number(req.params.boardId);
    const { name } = req.body;
    const sql = `
    UPDATE "boards"
        SET "name" = $1
      WHERE "boardId" = $2
      RETURNING *
    `;
    const result = await db.query(sql, [name, boardId]);
    const [updated] = result.rows;
    res.json(updated);
  }
};

module.exports = boards;
