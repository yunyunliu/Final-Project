import React from 'react';

const testData = {
  cardId: 9,
  name: 'learn typescript',
  description: 'types are important',
  columnId: 33,
  boardId: 12
};

const CardModal = ({ data, setExpanded, setEdit }) => {
  return (
    <dialog className='card-modal flex' open>
      <h2 className='no-margin card-task-name'>{testData.name}</h2>
      <div className='card-modal-description width-100'>
        <h3 className='pink-text no-margin'>Task Description:</h3>
        <div className='gray-text source-sans'> {testData.description}</div>
      </div>
      <div className='card-btns-container'>
       <button
          className='card-btns blue-bg gray-text semi-bold'
          type='button'
          onClick={e => setExpanded(false)}> Close</button>
        <button
          type='button'
          className='card-btns blue-bg gray-text semi-bold'
          onClick={() => {
            setExpanded(false);
            setEdit(true);
          }}>Edit
        </button>
      </div>
    </dialog>
  );
};

export default CardModal;
