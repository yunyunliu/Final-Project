import React, { useState } from 'react';

import CardModal from './CardModal';
import AddForm from './AddForm';

const Card = ({ cardData, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editCard, setEditCard] = useState(false);

  return (
    <li className='card blue-bg'>
      {isExpanded ? <CardModal data={cardData} setExpanded={setIsExpanded} /> : null }
      {/* {editCard ? <AddFrom /> : null} */}
      <div className='card-header'>
        <div className='card-name pink-text'>{cardData.name}</div>
        <div className='card-buttons flex'>
          <button
            type='button'
            onClick={() => handleDelete(cardData.cardId)}
            className='card-btn no-border no-padding blue-bg'>
            <i className='fas fa-times'></i>
          </button>
          <button type='button'
            className={'card-btn no-border no-padding blue-bg'}>
            <i className='fas fa-edit'></i>
          </button>
        </div>
      </div>
      <div className='card-desc'>
        {cardData.description}
      </div>
    </li>
  );
};

export default Card;
