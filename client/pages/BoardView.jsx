import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Column from './components/Column';
import BoardContext from './BoardContext';

const BoardView = () => {
  const [board, setBoard] = useState();
  const { boardId } = useParams();

  // fetch data once here and set to board;
  useEffect(() => {
    // fetch(`/api/users/1/boards/${boardId}`)
    fetch('/api/users/1/boards/1')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setBoard(data))
      .catch(err => console.error(err.message));
  }, []);

  const handleDeleteCol = async id => {
    await fetch(`/api/columns/${id}`,
      { method: 'DELETE' });
    const updated = board.columns.filter(col => col.columnId !== id);
    setBoard({ ...board, columns: updated });
  };

  const handleAddCol = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId: board.boardId })
    };
    const response = await fetch('/api/columns', options);
    if (response.ok) {
      const data = await response.json();
      const updated = board.columns.concat(data);
      setBoard({ ...board, columns: updated });
    }
  };

  const setColumnCards = (colId, newCards) => {
    const columns = board.columns;
    const columnToUpdate = columns.find(col => col.columnId == colId);
    columnToUpdate.cards = newCards;
    const updatedColumns = columns.map(col => col.columnId === colId ? columnToUpdate : col);
    setBoard({ ...board, columns: updatedColumns });
  };

  const getColumnCards = colId => {
    const { columns } = board;
    const targetCol = columns.find(col => col.columnId === colId);
    return targetCol.cards;
  };

  const handleEditCol = async (id, name) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    };
    const response = await fetch(`/api/columns/${id}`, options);
    const data = await response.json();
    const updated = board.columns.map(col => col.columnId === data.columnId ? { ...col, name: data.name } : col);
    setBoard({ ...board, columns: updated });
  };

  if (board) {
    return (
    <BoardContext.Provider value={{ board, setColumnCards, getColumnCards }}>
      <h1 style={{ textAlign: 'center', marginTop: 0 }}>{board.name}</h1>
      <div className='flex board-container'>
        { board.columns.map(col => (
          <Column
            key={col.columnId}
            columnData={col}
            handleDeleteCol={handleDeleteCol}
            handleEditCol={handleEditCol} />))}
        <button className='form-btn add-project-btn'
          style={{ minWidth: 175, marginLeft: 20 }}
          onClick={() => handleAddCol()}>
          <span style={{ marginRight: 5 }}><i className='fas fa-plus'></i></span>
          Add Column
        </button>
      </div>
    </BoardContext.Provider>
    );
  }
  return null;
};

export default BoardView;
