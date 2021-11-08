import React, { useState } from 'react';

const Card = ({ card }) => {

  const handleAdd = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'yunyun', description: 'learn javascript' })
    };
    const response = await fetch('/api/users/1/boards/12/col/33/cards', options);
    const newCard = await response.json();
    console.log('new card:', newCard);
  };

  return (
    <div className='card blue-bg'>
      <div className='card-name pink-text'>
        {card.name}
        <button type='button'
          className={'edit-card-btn no-border no-padding blue-bg'}>
          <i className='fas fa-edit'></i>
        </button>
      </div>
      <div className='card-desc'>
        {card.description}
      </div>
      <button type='button'
        onClick={() => handleAdd()}
        ><i className='fas fa-plus'></i> New Card</button>
    </div>
  );
};

export default Card;
