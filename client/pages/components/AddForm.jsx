import React, { useState, useEffect } from 'react';

import SubMenu from './SubMenu';

const AddForm = ({ setModal, handleAdd, colName }) => {
  const [description, setDescription] = useState(null);
  const [task, setTask] = useState(null);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('/api/users/1/boards/1/col/1/cards/1/tags')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => setTags(data));
  }, []);

  return (
    <dialog className='add-edit-modal' open>
      {/* {console.log(tags)} */}
      <form className='add-form flex flex-col align-center'>
        <h2 className='form-name no-margin'>Add new task card</h2>
          <div className='task-col-title'>in <span className='semi-bold pink-text'>{colName}</span></div>
        <label className='width-100 semi-bold'>Task:
          <input className='task-name-input '
            onChange={({ target }) => setTask(target.value)} />
        </label>
        <label className='description-label width-100 semi-bold'>Task Description:
          <textarea className='task-name-input gray-text source-sans'
            cols='25'
            onChange={({ target }) => setDescription(target.value)} />
        </label>
        <div className='flex label-input'>
          <button type='button'>Add tag</button>
          <SubMenu data={tags} setTags={setTags} />
        </div>
        <div className='add-btns-container flex width-100'>
          <button
            className='add-form-btn pink-text no-border blue-bg gray-text semi-bold'
            type='button'
            onClick={() => setModal(false)}>
              Cancel
          </button>
          <button
            type='button'
            className='form-btn pink-text no-border blue-bg gray-text semi-bold'
            onClick={() => {
              setModal(false);
              handleAdd(task, description);
            }} >
            Done
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddForm;
