import React, { useState } from 'react';

import CardModal from './CardModal';
import EditForm from './EditForm';

const Card = ({ cardData, handleDelete, handleEdit, select }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editCard, setEditCard] = useState(true);

  return (
    <li className='card blue-bg'>
       {editCard
         ? <EditForm data={cardData}
              setEdit={setEditCard}
              handleEdit={handleEdit}
              populateSelect={select} />
         : null}
      {isExpanded
        ? <CardModal data={cardData} setExpanded={setIsExpanded} />
        : null }
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
            className={'card-btn no-border no-padding blue-bg'}
            onClick={() => setEditCard(true)}>
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
