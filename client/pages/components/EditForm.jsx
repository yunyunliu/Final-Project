import React, { useState } from 'react';

const EditForm = ({ data, setEdit }) => {
  const [description, setDescription] = useState('data.description');
  const [task, setTask] = useState('data.name');

  return (
  <dialog className='add-modal' open>
    <form className='add-form flex flex-col align-center'>
      <h2 className='form-name'>Edit task card</h2>
      <label className='width-100 semi-bold'>Task:
        <input className='task-name-input'
          value={data.name}
          onChange={({ target }) => setTask(target.value)} />
      </label>
      <label className='description-label width-100 semi-bold'>Task Description:
        <textarea className='task-name-input gray-text source-sans'
          value={data.description}
          required='required'
          cols='25'
          onChange={({ target }) => setDescription(target.value)} />
      </label>
      <div className='add-btns-container flex width-100'>
        <button
          className='add-form-btn no-border blue-bg gray-text semi-bold'
          type='button'
          onClick={() => setEdit(false)}>
            Cancel
        </button>
        <button
          type='button'
          className='add-form-btn no-border blue-bg gray-text semi-bold'
          onClick={() => {
            const updated = {
              name: task,
              description
            };
            setEdit(false);
            // handleEdit(updated);
          }} >
          Done
        </button>
      </div>
    </form>
  </dialog>
  );
};

export default EditForm;
