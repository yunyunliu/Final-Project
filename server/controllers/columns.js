const columns = {
  get: async (req, res, db) => {
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
  },
  create: async (req, res, db) => {
    const { boardId } = req.params;
    const sql = `
    INSERT INTO "columns" ("boardId", "name")
      VALUES ($1, 'New Column')
      RETURNING *
  `;
    try {
      const results = await db.query(sql, [boardId]);
      const [newCol] = results.rows;
      res.status(201).json({ ...newCol, cards: [] });
    } catch (err) {
      console.error(err.message);
      res.send(err.message);
    }
  },
  delete: async (req, res, db) => {
    const { colId } = req.params;
    const sql = `
      DELETE FROM "columns"
        WHERE "columnId" = $1
    `;
    await db.query(sql, [colId]);
    res.sendStatus(204);
  },
  edit: async (req, res, db) => {
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
  }
};

module.exports = columns;
