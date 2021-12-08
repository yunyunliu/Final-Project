import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Column from './components/Column';
import BoardContext from './BoardContext';

const BoardView = () => {
  const [board, setBoard] = useState();
  const { boardId } = useParams();

  useEffect(() => {
    // fetch(`/api/users/1/boards/${boardId}`)
    fetch('api/users/1/boards/1')
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

  const reorderCards = (source, destination) => { // order not being saved to db
    const srcIndex = source.index;
    const destinationIndex = destination.index;
    const listCopy = getColumnCards(Number(source.droppableId)).slice();
    const [moved] = listCopy.splice(srcIndex, 1); // array.splice returns the removed element
    listCopy.splice(destinationIndex, 0, moved);
    listCopy.forEach((card, i) => { card.sequenceNum = i; }); // assign new sequence number for each card
    setColumnCards(Number(source.droppableId), listCopy);
  };

  const handleDragEnd = result => {
    const { source, destination } = result;
    console.log('destination', destination, 'source', source);
    if (destination.droppableId === source.droppableId) {
      reorderCards(source, destination);
      console.log('reorder');
    } else {
    //   // moveColumns(source, destination)
      console.log('move columns');
    }
  };

  if (board) {
    return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardContext.Provider value={{ board, setColumnCards, getColumnCards }}>
        <div style={{ flexWrap: 'wrap', maxWidth: 700, alignItems: 'baseline' }} className='space-between board-content'>
          <h1 className='board-name pink-text column-half'>{board.name}</h1>
          <button className='form-btn add-project-btn column-half'
            style={{ minWidth: 175 }}
            onClick={() => handleAddCol()}>
            <span style={{ marginRight: 5 }}><i className='fas fa-plus'></i></span>
            Add Column
          </button>
        </div>
        <div className='board-content flex'>
          { board.columns.length > 0
            ? board.columns.map(col => (
              <Column
                key={col.columnId}
                columnData={col}
                handleDeleteCol={handleDeleteCol}
                handleEditCol={handleEditCol} />))
            : (<div style={{ fontSize: 32, width: '100%', textAlign: 'center' }}>You have no tasks.</div>) }
        </div>
      </BoardContext.Provider>
    </DragDropContext>
    );
  }
  return (
    <div className='justify-center align-center' style={{ minHeight: 500 }}>
      <img src='/images/Dual Ring-1s-200px.gif' alt='spinner' />
    </div>);
};

export default BoardView;
