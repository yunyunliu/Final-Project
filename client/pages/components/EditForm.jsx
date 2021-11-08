import React, { useState } from 'react';

const EditForm = ({ data, setEdit, handleEdit }) => {
  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description);

  return (
  <dialog className='add-modal' open>
    <form className='add-form flex flex-col align-center'>
      <h2 className='form-name'>Edit task card</h2>
      <label className='width-100 semi-bold'>Task:
        <input className='task-name-input'
          value={task}
          onChange={({ target }) => setTask(target.value)} />
      </label>
      <label className='description-label width-100 semi-bold'>Task Description:
        <textarea className='task-name-input gray-text source-sans'
          value={description}
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
              ...data,
              name: task,
              description
            };
            handleEdit(updated);
            setEdit(false);
          }} >
          Done
        </button>
      </div>
    </form>
  </dialog>
  );
};

export default EditForm;
