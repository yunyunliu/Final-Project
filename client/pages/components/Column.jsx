import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from './Card';

const Column = ({ data, handleDelete, handleEdit }) => {
  const [colName, setColName] = useState(data.name);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [cards, setCards] = useState([]);
  // const [colId] = useParams();

  useEffect(() => {
    fetch('/api/users/1/boards/12/col/33/cards')
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

  const handleAdd = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'yunyun', description: 'learn javascript' })
    };
    const response = await fetch('/api/users/1/boards/12/col/33/cards', options);
    const newCard = await response.json();
    const updated = cards.concat(newCard);
    setCards(updated);
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
      {cards.map(card => <Card key={card.cardId} cardData={card} />)}
      <button type='button'
        onClick={() => handleAdd()}
        ><i className='fas fa-plus'></i> New Card</button>
    </div>
  );
};

export default Column;
