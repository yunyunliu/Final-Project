import React, { useState, useContext } from 'react';

import Card from './Card';
import AddForm from './AddForm';
import BoardContext from '../BoardContext';

const Column = ({ data, handleDeleteCol, handleEditCol }) => {
  const { setColumnCards, getColumnCards } = useContext(BoardContext);

  const [colName, setColName] = useState(data.name);
  const [displayEditCol, setDisplayEditCol] = useState(false);
  const [displayAddCard, setDisplayAddCard] = useState(false);

  const handleAddCard = async (name, description) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    };
    const response = await fetch(`/api/users/1/boards/1/col/${data.columnId}/cards`, options);
    if (response.ok) {
      const newCard = await response.json();
      const updated = data.cards.concat(newCard);
      setColumnCards(data.columnId, updated);
    }
  };

  const deleteCard = async cardId => {
    const response = await fetch(`/api/users/1/boards/1/col/${data.columnId}/cards/${cardId}`, { method: 'DELETE'});
    if (response.ok) {
      const updated = data.cards.filter(card => card.cardId !== cardId);
      setColumnCards(data.columnId, updated);
    }
  };

  const handleEditCard = async (editData, srcColId) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    };
    const response = await fetch(`/api/users/1/boards/1/col/${editData.columnId}/cards/${editData.cardId}`, options);
    if (response.ok) {
      const updated = await response.json();
      // check if card needs to move to another column
      if (editData.columnId === srcColId) {
        // if not moving
        const updatedCards = data.cards.map(card => card.cardId === updated.cardId ? updated : card);
        setColumnCards(data.columnId, updatedCards);
      } else {
        // if moving
        // add card to new column
        setColumnCards(editData.columnId, getColumnCards(editData.columnId).concat(editData));
        // remove card from current column
        const updatedCards = data.cards.filter(card => card.cardId !== editData.cardId);
        setColumnCards(data.columnId, updatedCards);
      }
    }
  };

  const editCol = (
    <div className='edit-col'>
      <input value={colName}
        className='col-edit-input'
        onChange={({ target }) => setColName(target.value)}
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
              handleEditCol(data.columnId, colName);
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
          <h2 className='col-name gray-text'>{data.name}</h2>
        </button>
        <button type='button'
          className='no-border col-btn'
          onClick={() => handleDeleteCol(data.columnId)}>
          <i className='fas fa-times col-icon semi-bold gray-text'></i>
        </button>
      </div>
  );

  return (
    <div className='col'>
      { displayEditCol ? editCol : columnName }
      <ul className='no-bullets no-padding card-list'>
        {data.cards.map(card => <Card key={card.cardId}
          cardData={card}
          handleDelete={deleteCard}
          colName={data.name}
          handleEdit={handleEditCard} />)}
      </ul>
      <button type='button'
        className='new-card-btn blue-bg pink-text semi-bold'
        onClick={() => setDisplayAddCard(true)}
        ><i className='fas fa-plus'></i> New Card</button>
        {displayAddCard
          ? <AddForm setModal={setDisplayAddCard}
              handleAdd={handleAddCard}
              colName={data.name} />
          : null}
    </div>
  );
};

export default Column;
