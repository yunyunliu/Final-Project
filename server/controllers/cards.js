const cards = {
  getAll: async (req, res, db) => {
    const { colId } = req.params;
    const sql = `
      SELECT *
          FROM "cards"
        WHERE "columnId" = $1;
    `;
    const values = [colId];
    try {
      const result = await db.query(sql, values);
      const cards = result.rows;
      res.json(cards);
    } catch (err) {
      console.error('error:', err);
      res.status(500).send({ error: 'something went wrong' });
    }
  },
  create: async (req, res, db) => {
    const { name, description } = req.body;
    const { colId, boardId } = req.params;
    const sql = `
      INSERT INTO "cards" ("name", "description", "columnId", "boardId")
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [name, description, colId, boardId];
    try {
      const result = await db.query(sql, values);
      const [newCard] = result.rows;
      res.status(201).json(newCard);
    } catch (err) {
      console.error('error:', err.message);
      res.status(500).send({ error: 'something went wrong' });
    }
  }
};

module.exports = cards;
