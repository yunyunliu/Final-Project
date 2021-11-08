import React from 'react';

const AddForm = () => {
  return (
    <dialog className='add-modal' open>
      <form className='add-form flex flex-col align-center'>
        <h2 className='form-name'>Add new task card</h2>
        <label className='width-100'>Task:
          <input className='task-name-input' />
        </label>
        <label className='description-label width-100'>Task Description:
          <textarea className='task-name-input' cols='25' />
        </label>
        <div className='add-btns-container flex width-100'>
          <button
            className='add-form-btn no-border blue-bg gray-text semi-bold'
            type='button'>
              Cancel
          </button>
          <button className='add-form-btn no-border blue-bg gray-text semi-bold'>
            Done
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddForm;
