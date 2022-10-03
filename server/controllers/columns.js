const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const columns = {
  get: async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    // const sql = `
    //   SELECT *
    //     FROM "columns"
    //   WHERE "boardId" = $1
    // `;
    // const values = [boardId];
    // const result = await db.query(sql, values);
    // const data = result.rows;
    const columns = await prisma.columns.findMany({
      where: { boardId },
      include: {
        cards: true
      }
    });
    res.json(columns);
  },
  create: async (req, res) => {
    const boardId = parseInt(req.body.boardId);
    try {
      const newCol = await prisma.columns.create({
        data: {
          name: 'New Column',
          boardId
        }
      });
      // const [newCol] = results.rows;
      console.log('newcol', newCol);
      res.status(201).json({ ...newCol, cards: [] });
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: err.message });
    }
  },
  delete: async (req, res) => {
    const columnId = parseInt(req.params.colId);
    await prisma.columns.delete({
      where: { columnId }
    });
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
        await body.forEach(card => {
          db.query(sql, [card.columnId, card.sequenceNum, card.cardId]);
        });
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
