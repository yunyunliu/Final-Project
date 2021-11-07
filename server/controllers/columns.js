
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
    const sql = `
    INSERT INTO "columns" ("boardId", name)
      VALUES (12, 'New Column')
      RETURNING *
  `;
    const results = await db.query(sql);
    const [data] = results.rows;
    res.status(201).json(data);
  },
  delete: async (req, res, db) => {
    const { colId } = req.params;
    const sql = `
      DELETE from "columns"
        WHERE "columnId" = $1
    `;
    const val = [colId];
    await db.query(sql, val);
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
