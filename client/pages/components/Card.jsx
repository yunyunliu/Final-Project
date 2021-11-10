import React, { useState } from 'react';

import CardModal from './CardModal';
import EditForm from './EditForm';

const Card = ({ cardData, handleDelete, handleEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editCard, setEditCard] = useState(false);

  return (
    <li className='card blue-bg'>
       {editCard
         ? <EditForm data={cardData}
              setEdit={setEditCard}
              handleEdit={handleEdit} />
         : null}
      {isExpanded
        ? <CardModal data={cardData} setExpanded={setIsExpanded} setEdit={setEditCard}/>
        : null }
      <div className='card-btns-container flex'>
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
        <button type='button' className='card-btn no-border no-padding blue-bg'
          onClick={() => setIsExpanded(true)}><i className='fas fa-expand'></i></button>
      </div>
      <div className='card-name pink-text'>{cardData.name}</div>
      <div className='card-desc'>
        {cardData.description}
      </div>
    </li>
  );
};

export default Card;
