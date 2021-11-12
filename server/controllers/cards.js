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
    const { name, description, tags } = req.body;
    const { colId, boardId } = req.params;
    const sql = `
      INSERT INTO "cards" ("name", "description", "columnId", "boardId")
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const relSql = `
      INSERT INTO "tagsCards" ("tagId", "cardId")
        VALUES ($1, $2)
    `;
    const result = await db.query(sql, [name, description, colId, boardId]);
    const [newCard] = result.rows;
    res.status(201).json(newCard);
    for (let i = 0; i < tags.length; i++) {
      const id = tags[i].tagId;
      await db.query(relSql, [id, newCard.cardId]);
    }
  },
  deleteCard: async (req, res, db) => {
    const { cardId } = req.params;
    const sql = `
      DELETE FROM "cards"
          WHERE "cardId" = $1
    `;
    const values = [cardId];
    await db.query(sql, values);
    res.sendStatus(204);
  },
  update: async (req, res, db) => {
    const { cardId } = req.params;
    const { name, description, columnId } = req.body;
    const sql = `
      UPDATE "cards"
          SET "name" = $1,
              "description" = $2,
              "columnId" = $3
          WHERE "cardId" = $4
          RETURNING *
    `;
    const values = [name, description, columnId, cardId];
    const result = await db.query(sql, values);
    const [record] = result.rows;
    if (record) {
      res.send(record);
    }
  }
};

module.exports = cards;
