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
  }
};

module.exports = tags;
