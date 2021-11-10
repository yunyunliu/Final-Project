import React, { useState, useContext } from 'react';

import BoardContext from '../BoardContext';

const EditForm = ({ data, setEdit, handleEdit }) => {
  const { board } = useContext(BoardContext);

  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [value, setValue] = useState('label');

  const getColName = colId => {
    const { columns } = board;
    const found = columns.find(col => col.columnId === colId);
    return found.name;
  };

  return (
  <dialog className='add-edit-modal' open>
    <form className='flex edit-form flex-col align-center'>
      <h2 className='form-name no-margin'>Edit task card</h2>
      <div className='task-col-title'> in <span className='pink-text semi-bold'>{getColName(data.columnId)}</span></div>
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
            }}>
          <option value='label'>Choose column</option>
          {board.columns.map(col => <option key={col.columnId} value={col.columnId}>{col.name}</option>)}
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
              columnId: value === 'label' ? data.columnId : Number(value),
              name: task,
              description
            };
            handleEdit(updated, data.columnId);
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
