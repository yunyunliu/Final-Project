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
  getOne: async (req, res, db) => {
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
  },
  create: async (req, res, db) => {
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
  },
  delete: async (req, res, db) => {
    const boardId = req.params.boardId;
    const sql = `
      DELETE FROM "boards"
        WHERE "boardId" = $1
    `;
    const values = [boardId];
    await db.query(sql, values);
    res.sendStatus(204);
  },
  edit: async (req, res, db) => {
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
  }
};

module.exports = boards;
