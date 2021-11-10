import React, { useState, useContext } from 'react';

import BoardContext from '../BoardContext';

const EditForm = ({ data, setEdit, handleEdit }) => {
  const { board } = useContext(BoardContext);

  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [value, setValue] = useState('label');

  return (
  <dialog className='actually-edit-form add-modal' open>
    {value}
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
            value={value}
            onChange={({ target }) => {
              setValue(target.value);
              // console.log('value:', value)
              // console.log('e.target.value:', Number(target.value))
              // if (target.value) {
              //   setMoveTo(Number(target.value));
            }
            }>
          <option value='label'>Choose column</option>
          {board.columns.map(col => <option key={col.columnId} value={col.columnId}>{col.columnId}{col.name}</option>)}
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
            // console.log('value:', value)
            const updated = {
              ...data,
              columnId: value === 'label' ? data.columnId : Number(value),
              name: task,
              description
            };
            console.log('editData:', updated)
            handleEdit(updated, data.columnId );
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
