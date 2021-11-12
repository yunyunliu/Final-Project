const tags = {
  create: async (req, res, db) => {
    const { boardId } = req.params;
    const { color, text } = req.body;
    const sql = `
      INSERT INTO "tags" ("color", "text", "boardId")
            VALUES ($1, $2, $3)
          RETURNING *;
    `;
    try {
      const result = await db.query(sql, [color, text, boardId]);
      const [newTag] = result.rows;
      res.json(newTag);
    } catch (err) {
      res.send(err.message);
    }
  },
  get: async (req, res, db) => {
    const { boardId } = req.params;
    const sql = `
      SELECT *
        FROM "tags"
      WHERE "boardId" = $1
    `;
    try {
      const result = await db.query(sql, [boardId]);
      const tags = result.rows;
      res.json(tags);
    } catch (err) {
      res.status(500).send('error');
      console.error('error:', err.message);
    }
  }
};

module.exports = tags;
