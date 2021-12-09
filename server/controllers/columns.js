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
    const { boardId } = req.body;
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
      res.status(400).json({ error: err.message });
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
    try {
      const result = await db.query(sql, [req.body.name, colId]);
      const [column] = result.rows;
      res.json({ ...column, cards: [] });
    } catch (err) {
      console.error('error:', err.message);
      res.status(500).send({ error: 'something went wrong' });
    }
  },
  editCardOrder: async (req, res, db) => {
    const body = req.body;
    const sql = `
      UPDATE "cards"
          SET "columnId" = $1,
         "sequenceNum" = $2
        WHERE "cardId" = $3
    `;
    const selectSql = `
      SELECT *
          FROM "cards"
        WHERE "columnId" = $1
      ORDER BY "sequenceNum"
    `;

    if (body.length > 0) {
      try {
        await body.forEach(card => { db.query(sql, [card.columnId, card.sequenceNum, card.cardId]); });
        const result = await db.query(selectSql, [req.params.colId]);
        res.json(result.rows);
      } catch (err) {
        res.sendStatus(500);
        console.log('error:', err.message);
      }
    } else {
      res.json([]);
    }
  }
};

module.exports = columns;
