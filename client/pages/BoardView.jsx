import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FocusTrap from 'focus-trap-react';

import Column from './components/Column';
import BoardContext from './BoardContext';

const BoardView = () => {
  const [board, setBoard] = useState();
  const { boardId } = useParams();

  useEffect(() => {
    fetch('/api/users/1/boards/' + 3)
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

  const reorderCards = async (source, destination) => { // order not being saved to db
    const srcIndex = source.index;
    const destinationIndex = destination.index;
    const listCopy = getColumnCards(Number(source.droppableId)).slice();
    const [moved] = listCopy.splice(srcIndex, 1); // array.splice returns the removed element
    listCopy.splice(destinationIndex, 0, moved);
    listCopy.forEach((card, i) => { card.sequenceNum = i; }); // assign new sequence number for each card
    setColumnCards(Number(source.droppableId), listCopy);
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listCopy)
    };
    const response = await fetch(`/api/columns/${Number(source.droppableId)}/cards`, options);
    if (response.ok()) {
      const updatedCards = await response.json();
      setColumnCards(Number(source.droppableId), updatedCards);
    }
  };

  const moveColumns = async (source, destination) => {
    const srcIndex = source.index;
    const destinationIndex = destination.index;
    const srcList = getColumnCards(Number(source.droppableId)).slice();
    const [moved] = srcList.splice(srcIndex, 1);
    srcList.forEach((p, i) => { p.sequenceNum = i; });
    const destinationList = getColumnCards(Number(destination.droppableId)).slice();
    destinationList.splice(destinationIndex, 0, { ...moved, columnId: Number(destination.droppableId) });
    destinationList.forEach((p, i) => { p.sequenceNum = i; });
    setColumnCards(Number(source.droppableId), srcList);
    setColumnCards(Number(destination.droppableId), destinationList);
    const options1 = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(srcList)
    };
    const options2 = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(destinationList)
    };
    const srcResponse = await fetch(`/api/columns/${Number(source.droppableId)}/cards`, options1);
    const destinationResponse = await fetch(`/api/columns/${Number(destination.droppableId)}/cards`, options2);
  };

  const handleDragCard = (source, destination) => {
    if (destination.droppableId === source.droppableId) {
      reorderCards(source, destination);
    } else {
      moveColumns(source, destination);
    }
  };

  const handleDragCol = () => {

  };

  const handleDragEnd = result => {
    const { source, destination, draggableId, type } = result;
    if (!destination) return; // invalid drop location
    if (type === 'card') {
      // Draggable is a Card component
      handleDragCard(source, destination);
    }
    if (type === 'column') { // Draggable is a Column component

    }

  };

  if (board) {
    return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardContext.Provider value={{ board, setColumnCards, getColumnCards }}>
        <div style={{ width: '100%', paddingTop: 0, paddingBottom: 0 }} className='board-content'>
          <h1 className='board-name pink-text center-text'>{board.name}</h1>
        </div>
        <div style={{ paddingLeft: 100, paddingRight: 100, display: 'flex' }}>
          <Droppable droppableId='columns' type='column' direction='horizontal'>
            {({ innerRef, droppableProps, placeholder }) => (
              <ul className='no-bullets no-padding width-100'
                  style={{ display: 'flex', marginTop: 0 }}
                  {...droppableProps}
                  ref={innerRef}>
                { board.columns.map((col, i) => (
                  <Draggable key={col.columnId} draggableId={`column-${col.columnId}`} index={i}>
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                      <li ref={innerRef} {...draggableProps} {...dragHandleProps} >
                        <Column
                          columnData={col}
                          handleDeleteCol={handleDeleteCol}
                          handleEditCol={handleEditCol} />
                      </li>
                    )}
                  </Draggable>)) }
                  {placeholder}
                <li>
                  <button className='form-btn add-project-btn'
                    style={{ minWidth: 175, marginRight: 20, marginLeft: 20, marginTop: 10 }}
                    onClick={() => handleAddCol()}>
                    <span style={{ marginRight: 5 }}><i className='fas fa-plus'></i></span>
                    Add Column
                  </button>
                </li>
              </ul>
            )
            }

          </Droppable>
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
