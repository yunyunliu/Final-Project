import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Column from './components/Column';
import BoardContext from './BoardContext';

const BoardView = () => {
  const [board, setBoard] = useState();
  const [columns, setColumns] = useState([]);
  // const { boardId } = useParams();
  useEffect(() => {
    fetch('/api/users/1/boards/1/')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setBoard(data));
  }, []);

  const handleDeleteCol = async id => {
    await fetch(`/api/users/1/boards/1/col/${id}`,
      { method: 'DELETE' });
    const updated = columns.filter(col => col.columnId !== id);
    setColumns(updated);
  };

  const handleAddCol = async () => {
    const response = await fetch('/api/users/1/boards/1/col', { method: 'POST' });
    const data = await response.json();
    const updated = columns.concat(data);
    setColumns(updated);
  };

  const setColumnCards = (colId, cards) => {
    const { columns } = board;
    const updated = columns.map(col => (col.columnId === colId)
      ? { ...col, cards }
      : col);
    setBoard({ columns: updated });
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
    const response = await fetch(`/api/users/1/boards/1/col/${id}`, options);
    const data = await response.json();
    const updated = columns.map(col => col.columnId === data.columnId ? data : col);
    setColumns(updated);
  };

  if (board) {
    return (
    <BoardContext.Provider value={{ board, setColumnCards, getColumnCards }}>
      <div className='flex board-container'>
        {console.log('columns', board)}
        {board.columns.map(col => <Column key={col.columnId}
            data={col}
            handleDeleteCol={handleDeleteCol}
            handleEditCol={handleEditCol} />)}
        <button className='add-project-btn blue-bg semi-bold pink-text add-col'
          onClick={() => handleAddCol()}>
          <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
          Add Column
        </button>
      </div>
    </BoardContext.Provider>
    );
  }
  return null;
};

export default BoardView;
