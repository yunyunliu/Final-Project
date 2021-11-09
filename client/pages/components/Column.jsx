import React, { useState, useEffect } from 'react';

import Card from './Card';
import AddForm from './AddForm';


const Column = ({ data, handleDelete, handleEdit }) => {
  const [colName, setColName] = useState(data.name);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
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

  const handleAdd = async (name, description) => {
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
            onClick={() => setDisplayEdit(false)}>
            Cancel
          </button>
          <button type='button'
            className='edit-col-btn gray-text'
            onClick={() => {
              setDisplayEdit(false);
              handleEdit(data.columnId, colName);
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
          onDoubleClick={() => setDisplayEdit(true)}>
          <h2 className='col-name gray-text'>{data.name}</h2>
        </button>
        <button type='button'
          className='no-border col-btn'
          onClick={() => handleDelete(data.columnId)}>
          <i className='fas fa-times col-icon semi-bold gray-text'></i>
        </button>
      </div>
  );

  return (
    <div className='col'>
      { displayEdit ? editCol : columnName }
      <ul className='no-bullets no-padding card-list'>
        {cards.map(card => <Card key={card.cardId}
          cardData={card}
          handleDelete={deleteCard}
          handleEdit={handleEditCard} />)}
      </ul>
      <button type='button'
        className='new-card-btn blue-bg pink-text semi-bold'
        onClick={() => setDisplayModal(true)}
        ><i className='fas fa-plus'></i> New Card</button>
        {displayModal ? <AddForm setModal={setDisplayModal} handleAdd={handleAdd} /> : null}
    </div>
  );
};

export default Column;
