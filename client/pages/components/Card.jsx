import React, { useState } from 'react';

import CardModal from './CardModal';
import EditForm from './EditForm';

const Card = ({ cardData, handleEdit, colName, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editCard, setEditCard] = useState(false);

  return (
    <div className='card blue-bg'>
       {editCard
         ? <EditForm data={cardData}
              setEdit={setEditCard}
              handleEdit={handleEdit}
              colName={colName} />
         : null}
      {isExpanded
        ? <CardModal data={cardData} setExpanded={setIsExpanded} setEdit={setEditCard}/>
        : null }
      <div className='flex card-btns-container'>
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
      <button
        type='button'
        onClick={() => setIsExpanded(true)}
        className='card-name pink-text blue-bg no-padding no-border'>{cardData.name}
      </button>
        {(<div style={{ margin: '5 10', display: 'flex' }}>
            { cardData.tags
              ? cardData.tags.map(tag => (
                    <div
                      key={tag.tagId}
                      className={`${tag.color} card-label tooltip`}>
                      <span className='tooltiptext'>{tag.text}</span>
                    </div>))
              : null
              }
             </div>)}
      <div style={{ paddingBottom: 10 }}>
        {cardData.description}
      </div>
    </div>
  );
};

export default Card;
