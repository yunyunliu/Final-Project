import React, { useState, useContext } from 'react';

import CardModal from './CardModal';
import EditForm from './EditForm';
import BoardContext from '../BoardContext';

const Card = ({ cardData, handleDelete, handleEdit, colName }) => {
  const { board } = useContext(BoardContext);

  const [isExpanded, setIsExpanded] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const [selectVal, setSelectVal] = useState('label');

  const colSelect = (
    <select className='card-col-select'
        value={selectVal}
        onChange={({ target }) => {
          setSelectVal(target.value);
          setShowSelect(false);
        }}>
      <option value='label'>Move to</option>
      {board.columns.map(col => <option key={col.columnId} value={col.columnId}>{col.name}</option>)}
    </select>
  );

  return (
    <li className='card blue-bg'>
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
        {showSelect ? colSelect : null}
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
        <button
          type='button'
          onClick={() => setShowSelect(!showSelect)}
          className='card-btn no-border no-padding blue-bg'>
          <i className='fas fa-ellipsis-v'></i>
        </button>
      </div>
      <div className='card-name pink-text'>{cardData.name}</div>
        <div className='tag-section flex'>
          {cardData.tags.map(tag => (<div
            key={tag.tagId}
            className={`${tag.color} card-label`}
            > </div>))}
        </div>

      <div className='card-desc'>
        {cardData.description}
      </div>
      <div className='flex card-bottom'>
        <button type='button' className='card-btn no-border no-padding blue-bg'
          onClick={() => setIsExpanded(true)}><i className='fas fa-expand'></i>
        </button>
      </div>
    </li>
  );
};

export default Card;
