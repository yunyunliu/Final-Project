import React from 'react';

const CardModal = ({ data, setExpanded, setEdit }) => {
  return (
    <dialog className='card-modal flex' open>
      <h2 className='no-margin card-task-name'>{data.name}</h2>
      <div className='card-modal-description width-100'>
        <h3 className='pink-text no-margin expanded-description'>Task Description:</h3>
        <div className='gray-text source-sans expanded-description'> {data.description}</div>
      </div>
      <div className='expanded-btns'>
       <button
          className='card-btns blue-bg pink-text semi-bold'
          type='button'
          onClick={e => setExpanded(false)}> Close</button>
        <button
          type='button'
          className='card-btns blue-bg pink-text semi-bold'
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
