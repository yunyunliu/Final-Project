import React, { useState } from 'react';

const EditForm = ({ data, setEdit, handleEdit, populateSelect }) => {
  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [destinationId, setDestinationId] = useState(null);

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
        <textarea className='task-name-input gray-text source-sans description-input'
          value={description}
          required='required'
          cols='25'
          onChange={({ target }) => setDescription(target.value)} />
      </label>
      <label className='semi-bold width-100'> Move Card:
        <select className='col-select'
            onChange={e => setDestinationId(Number(e.target.value))}>
          <option value=''>Choose column</option>
          {populateSelect()}
        </select>
      </label>
      <div className='add-btns-container flex width-100 edit-btns'>
        <button
          className='add-form-btn no-border blue-bg gray-text semi-bold pink-text'
          type='button'
          onClick={() => setEdit(false)}>
            Cancel
        </button>
        <button
          type='button'
          className='add-form-btn no-border blue-bg gray-text semi-bold pink-text'
          onClick={() => {
            const updated = {
              ...data,
              columnId: destinationId,
              name: task,
              description
            };
            // console.log('data:', data)
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
