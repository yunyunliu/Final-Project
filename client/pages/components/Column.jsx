import React, { useState, useContext } from 'react';

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
    console.log('cardid', cardId)
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
      // check if card needs to move to another column
      if (editData.columnId === srcColId) {
        // if not moving
        const updatedCards = columnData.cards.map(card => card.cardId === updated.cardId ? updated : card);
        setColumnCards(columnData.columnId, updatedCards);
      } else {
        // if moving
        // add card to new column
        setColumnCards(editData.columnId, getColumnCards(editData.columnId).concat(editData));
        // remove card from current column
        const updatedCards = columnData.cards.filter(card => card.cardId !== editData.cardId);
        setColumnCards(columnData.columnId, updatedCards);
      }
    }
  };

  const editCol = (
    <div className='edit-col'>
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
        <div className='edit-btn-container gray-text'>
          <button type='button'
            className='edit-col-btn'
            onClick={() => setDisplayEditCol(false)}>
            Cancel
          </button>
          <button type='button'
            className='edit-col-btn gray-text'
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
    <div className='col-header flex align-center'>
        <button type='button'
          className='col-name-btn'
          onDoubleClick={() => setDisplayEditCol(true)}>
          <h2 className='col-name gray-text'>{columnData.name}</h2>
        </button>
        <button type='button'
          className='no-border col-btn'
          onClick={() => handleDeleteCol(columnData.columnId)}>
          <i className='fas fa-times col-icon semi-bold gray-text'></i>
        </button>
      </div>
  );

  return (
    <div className='col'>
      { displayEditCol ? editCol : columnName }
      <ul className='no-bullets no-padding card-list'>
        {columnData.cards.map(card => <Card key={card.cardId}
          cardData={card}
          handleDelete={deleteCard}
          colName={columnData.name}
          handleEdit={handleEditCard} />)}
      </ul>
      <button type='button'
        className='new-card-btn blue-bg pink-text semi-bold btn'
        onClick={() => setDisplayAddCard(true)}
        ><i className='fas fa-plus'></i> New Card</button>
        {displayAddCard
          ? <AddForm setModal={setDisplayAddCard}
              handleAdd={handleAddCard}
              colName={columnData.name} />
          : null}
    </div>
  );
};

export default Column;
