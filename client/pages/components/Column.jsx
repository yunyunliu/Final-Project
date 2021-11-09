import React, { useState, useEffect } from 'react';

import Card from './Card';
import AddForm from './AddForm';

const Column = ({ data, handleDeleteCol, handleEditCol, populateSelect }) => {
  const [colName, setColName] = useState(data.name);
  const [displayEditCol, setDisplayEditCol] = useState(false);
  const [displayAddCard, setDisplayAddCard] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`/api/users/1/boards/12/col/${data.columnId}/cards`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setCards(data))
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleAddCard = async (name, description) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    };
    const response = await fetch(`/api/users/1/boards/12/col/${data.columnId}/cards`, options);
    if (response.ok) {
      const newCard = await response.json();
      const updated = cards.concat(newCard);
      setCards(updated);
    }
  };

  const deleteCard = async cardId => {
    const response = await fetch(`/api/users/1/boards/12/col/${data.columnId}/cards/${cardId}`, { method: 'DELETE'});
    if (response.ok) {
      const updated = cards.filter(card => card.cardId !== cardId);
      setCards(updated);
    }
  };

  const handleEditCard = async editData => {
    console.log('data send to server:', editData)
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    };
    const response = await fetch(`/api/users/1/boards/12/col/${editData.columnId}/cards/${editData.cardId}`, options);
    if (response.ok) {
      const updated = await response.json();
      const updatedCards = cards.map(card => editData.cardId === updated.cardId ? updated : card);
      setCards(updatedCards);
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
        {cards.map(card => <Card key={card.cardId}
          cardData={card}
          handleDelete={deleteCard}
          handleEdit={handleEditCard}
          select={populateSelect} />)}
      </ul>
      <button type='button'
        className='new-card-btn blue-bg pink-text semi-bold'
        onClick={() => setDisplayAddCard(true)}
        ><i className='fas fa-plus'></i> New Card</button>
        {displayAddCard ? <AddForm setModal={setDisplayAddCard} handleAdd={handleAddCard} /> : null}
    </div>
  );
};

export default Column;
