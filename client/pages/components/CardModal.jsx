import React from 'react';
import FocusTrap from 'focus-trap-react';

const CardModal = ({ data, setExpanded, setEdit }) => {
  return (
    <FocusTrap>
      <dialog className='card-modal flex' open>
        <h2 className='no-margin'>{data.name}</h2>
        <div className='flex width-100' style={{ margin: 10 }}>
          {data.tags.map(tag => (<div
            key={tag.tagId}
            className={`${tag.color} expanded-tags tooltip`}>
            <span className='tooltiptext'>{tag.text}</span>
            </div>))}
        </div>
        <div className=' width-100'>
          <h3 className='pink-text no-margin' style={{ marginBottom: 10 }}>Task Description:</h3>
          <div className='gray-text source-sans' style={{ marginBottom: 10, minHeight: 40 }}> {data.description}</div>
        </div>
        <div className='space-between width-100'>
        <button
            className='form-btn'
            type='button'
            onClick={e => setExpanded(false)}> Close</button>
          <button
            type='button'
            className='form-btn'
            onClick={() => {
              setEdit(true);
              setExpanded(false);
            }}>Edit
          </button>
        </div>
      </dialog>
    </FocusTrap>
  );
};

export default CardModal;
