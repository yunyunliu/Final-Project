const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const boards = {
  get: async (req, res) => {
    const { id } = req.params;
    const boards = await prisma.boards.findMany();
    console.log('boards', boards);
    res.json(boards);
  },
  // get all card, column, and board data for one board
  getOne: async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    console.log('boardId', boardId);
    const board = await prisma.boards.findUniqueOrThrow({
      where: { boardId: boardId },
      include: {
        columns: {
          include: {
            cards: true
          }
        }
      }
    });
    console.log(board);
    res.send(board);
  },
  create: async (req, res) => {
    const userId = parseInt(req.params.id);
    const newBoard = await prisma.boards.create({
      data: {
        name: 'New Project',
        userId
      }
    });
    console.log('result', newBoard);
    res.status(201).json(newBoard);
  },
  delete: async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    await prisma.boards.delete({
      where: {
        boardId
      }
    });
    res.sendStatus(204);
  },
  edit: async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const { name } = req.body;
    try {
      const updated = await prisma.boards.update({
        where: { boardId },
        data: {
          name
        }
      });
      console.log('updated', updated);
      res.json(updated);
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  },
  editColumnOrder: async (req, res) => {
    const boardId = parseInt(req.params.boardId);
    const body = req.body;
    // const sql = `
    //   UPDATE "columns"
    //     SET "sequenceNum" = $1
    //   WHERE "columnId" = $2
    // `;
    // const selectSql = `
    //   SELECT *
    //       FROM "columns"
    //     WHERE "boardId" = $1
    //   ORDER BY "sequenceNum"
    // `;
    try {
      // await body.forEach(col => {
      //   db.query(sql, [col.sequenceNum, col.columnId]);
      // });
      // const result = await db.query(selectSql, [boardId]);
      // res.json(result.rows);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
      console.log('error:', err.message);
    }
  }
};

module.exports = boards;
