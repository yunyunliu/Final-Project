import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Column from './components/Column';
import AddForm from './components/AddForm';
import BoardContext from './BoardContext';

const BoardView = () => {
  const [board, setBoard] = useState();
  const [columns, setColumns] = useState([]);
  // const { boardId } = useParams();
  // fetch data once here and set to board;
  useEffect(() => {
    fetch('/api/users/1/boards/1/')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        setBoard(data);
        setColumns(data.columns);
      });
  }, []);

  const handleDeleteCol = async id => {
    // console.log('cols after before' + id + ' :', columns);
    await fetch(`/api/users/1/boards/1/col/${id}`,
      { method: 'DELETE' });
    const updated = columns.filter(col => col.columnId !== id);
    // console.log('cols after delete' + id + ' :', updated);
    setColumns(updated);
  };

  const handleAddCol = async () => {
    const response = await fetch('/api/users/1/boards/1/col', { method: 'POST' });
    const data = await response.json();
    const updated = columns.concat(data);
    // console.log('cols after add', 'new col: ' +  data.columnId, updated);
    setColumns(updated);

  };

  const setColumnCards = (colId, newCards) => {
    const columns = board.columns;
    const columnToUpdate = columns.find(col => col.columnId === colId);
    columnToUpdate.cards = newCards;
    const updatedColumns = columns.map(col => col.columnId === colId ? columnToUpdate : col);
    setBoard({ columns: updatedColumns });
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
    console.log('cols after updated col: ' + id, updated);
    setColumns(updated);
  };

  if (board) {
    return (
    <BoardContext.Provider value={{ board, setColumnCards, getColumnCards }}>
      <div className='flex board-container'>
        {/* {console.log(columns)} */}
        {columns.map(col => <Column key={col.columnId}
            data={col}
            handleDeleteCol={handleDeleteCol}
            handleEditCol={handleEditCol} />)}
        <button className='add-project-btn blue-bg semi-bold pink-text add-col'
          onClick={() => handleAddCol()}>
          <span className='plus-icon-container btn'><i className='fas fa-plus'></i></span>
          Add Column
        </button>
      </div>
    </BoardContext.Provider>
    );
  }
  return null;
};

export default BoardView;
