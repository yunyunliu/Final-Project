import React from 'react';

const Card = ({ cardData }) => {

  return (
    <li className='card blue-bg'>
      <div className='card-name pink-text'>
        {cardData.name}
        <button type='button'
          className={'edit-card-btn no-border no-padding blue-bg'}>
          <i className='fas fa-edit'></i>
        </button>
      </div>
      <div className='card-desc'>
        {cardData.description}
      </div>
    </li>
  );
};

export default Card;
