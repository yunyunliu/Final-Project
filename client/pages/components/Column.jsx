import React, { useState, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import Card from './Card';
import AddForm from './AddForm';
import BoardContext from '../BoardContext';

const Column = ({ columnData, handleDeleteCol, handleEditCol }) => {
  const { setColumnCards, getColumnCards } = useContext(BoardContext);

  const [colName, setColName] = useState(columnData.name);
  const [displayEditCol, setDisplayEditCol] = useState(false);
  const [displayAddCard, setDisplayAddCard] = useState(false);

  const handleAddCard = async (name, description, tags) => {
    const { boardId, columnId } = columnData;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, tags, boardId, columnId })
    };
    const response = await fetch('/api/cards', options);
    if (response.ok) {
      const newCard = await response.json();
      const updated = columnData.cards.concat({ ...newCard, tags });
      setColumnCards(columnData.columnId, updated);
    }
  };

  const deleteCard = async cardId => {
    const response = await fetch(`/api/cards/${cardId}`, { method: 'DELETE' });
    if (response.ok) {
      const updated = columnData.cards.filter(card => card.cardId !== cardId);
      setColumnCards(columnData.columnId, updated);
    }
  };

  const handleEditCard = async (editData, srcColId) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    };
    const response = await fetch(`/api/cards/${editData.cardId}`, options);
    if (response.ok) {
      const updated = await response.json();
      if (editData.columnId === srcColId) {
        // if not moving
        const updatedCards = columnData.cards.map(card => card.cardId === updated.cardId ? updated : card);
        setColumnCards(columnData.columnId, updatedCards);
      } else {
        setColumnCards(editData.columnId, getColumnCards(editData.columnId).concat(editData));
        // remove card from current column
        const updatedCards = columnData.cards.filter(card => card.cardId !== editData.cardId);
        setColumnCards(columnData.columnId, updatedCards);
      }
    }
  };

  const editCol = (
    <div className='flex flex-col' style={{ width: '80%', padding: '10px 5px' }}>
      <input value={colName}
        className='col-edit-input'
        onChange={({ target }) => setColName(target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setDisplayEditCol(false);
            handleEditCol(columnData.columnId, colName);
          }
        }}
        />
        <div className='space-between gray-text'>
          <button type='button'
            className='form-btn'
            onClick={() => setDisplayEditCol(false)}>
            Cancel
          </button>
          <button type='button'
            className='form-btn'
            onClick={() => {
              setDisplayEditCol(false);
              handleEditCol(columnData.columnId, colName);
            }}>
            Done
          </button>
        </div>
    </div>
  );

  const columnName = (
    <div className='width-100 flex align-center space-between' style={{ padding: '10px 5px' }}>
        <button type='button'
          className='col-name-btn'
          onDoubleClick={() => setDisplayEditCol(true)}>
          <h2 className='gray-text'
            style={{ margin: '0 10px', fontWeight: 400 }}>{columnData.name}</h2>
        </button>
        <button type='button'
          className='no-border col-btn'
          onClick={() => handleDeleteCol(columnData.columnId)}>
          <i className='fas fa-times delete-icon'></i>
        </button>
      </div>
  );

  return (
    <div className='col'>
      { displayEditCol ? editCol : columnName }
      { displayEditCol
        ? null
        : (<button type='button'
            className='form-btn'
            onClick={() => setDisplayAddCard(true)}>
            <i className='fas fa-plus'></i> New Card
          </button>) }
      <Droppable droppableId={columnData.columnId + ''} type='card' style={{ minHeight: 100 }}>
        {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
          <ul className={`no-bullets no-padding ${columnData.columnId}`}
            style={{ width: 170, marginBottom: 20, marginTop: 20, backgroundColor: isDraggingOver ? '#dbf1f1' : '#f0f0f0' }}
            {...droppableProps}
            ref={innerRef}>
          {columnData.cards.map((card, i) => (
            <Draggable key={card.cardId} draggableId={card.cardId + ''} index={i}>
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <li ref={innerRef} {...draggableProps} {...dragHandleProps}>
                  <Card
                  cardData={card}
                  handleDelete={deleteCard}
                  colName={columnData.name}
                  handleEdit={handleEditCard} />
                </li>
              )}
            </Draggable>))}
            {placeholder}
          </ul>
        )}
      </Droppable>
        {displayAddCard
          ? <AddForm setModal={setDisplayAddCard}
                handleAdd={handleAddCard}
                colName={columnData.name} />
          : null}
    </div>
  );
};

export default Column;
