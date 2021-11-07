import React, { useState } from 'react';

const Card = ({ card }) => {

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
      <button type='button'><i className='fas fa-plus'></i> New Card</button>
      </div>
  );
};

export default Card;
