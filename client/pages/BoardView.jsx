import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Column from './components/Column';
import BoardContext from './BoardContext';

const BoardView = () => {
  const [board, setBoard] = useState();
  const { boardId } = useParams();

  // fetch data once here and set to board;
  useEffect(() => {
    console.log('params', boardId)
    fetch(`/api/users/1/boards/${boardId}`) // get boardId from URL, for when board is no longer hard coded
    // fetch('/api/users/1/boards/1') // hardcoded board id
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
    // setColumns(updated);
    setBoard({ ...board, columns: updated });
  };

  const handleAddCol = async () => {
    console.log(board)
    console.log('boardId', board.boardId)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boardId: board.boardId })
    };
    const response = await fetch('/api/columns', options);
    // console.log('response', response)
    if (response.ok) {
      const data = await response.json();
      console.log('data', data)
      const updated = board.columns.concat(data);
      // setColumns(updated);
      setBoard({ ...board, columns: updated });
    }
  };

  const setColumnCards = (colId, newCards) => {
    console.log('set to col', colId, 'cards', newCards)
    const columns = board.columns;
    console.log('columns', columns)
    const columnToUpdate = columns.find(col => col.columnId == colId);
    console.log('colto update', columnToUpdate)
    columnToUpdate.cards = newCards;
    const updatedColumns = columns.map(col => col.columnId === colId ? columnToUpdate : col);
    // setColumns(updatedColumns);
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
    // setColumns(updated);
    setBoard({ ...board, columns: updated });
  };

  if (board) {
    return (
    <BoardContext.Provider value={{ board, setColumnCards, getColumnCards }}>
      {/* {console.log('board:', board)} */}
      <h1 style={{ textAlign: 'center', marginTop: 0 }}>{board.name}</h1>
      <div className='flex board-container'>
        {/* {<AddForm colName='todos'/>} */}
        { board.columns.map(col => (
          <Column
            key={col.columnId}
            columnData={col}
            handleDeleteCol={handleDeleteCol}
            handleEditCol={handleEditCol} />))}
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
