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
  // get all card, column, and board data for a board
  getOne: async (req, res, db) => {
    const { boardId } = req.params;
    const boardQuery = `
      SELECT *
      FROM "boards"
    WHERE "boardId" = $1
  `;
    const boardResult = await db.query(boardQuery, [boardId]);
    const [board] = boardResult.rows;
    const colsQuery = `
        SELECT *
        FROM "columns"
      WHERE "boardId" = $1
    `;
    const colResult = await db.query(colsQuery, [boardId]);
    const columns = colResult.rows;
    const cardsQuery = `
        SELECT *
        FROM "cards"
      WHERE "columnId" = $1
    `;
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const cardsResult = await db.query(cardsQuery, [col.columnId]);
      // console.log(cardsResult.rows)
      col.cards = cardsResult.rows;
    }
    board.columns = columns;
    res.json(board);
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
