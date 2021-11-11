import React, { useState, useContext } from 'react';

import BoardContext from '../BoardContext';
import SubMenu from './SubMenu';

const EditForm = ({ data, setEdit, handleEdit, colName }) => {
  const { board } = useContext(BoardContext);

  const [displaySubMenu, setDisplaySubMenu] = useState(false);
  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [value, setValue] = useState('label');
  const [tempTags, setTempTags] = useState([]);

  return (
  <dialog className='add-edit-modal' open>
    <form className='flex edit-form flex-col align-center'>
      <h2 className='form-name no-margin'>Edit task card</h2>
      <div className='task-col-title'> in <span className='pink-text semi-bold'>{colName}</span></div>
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
      <div className='flex label-input'>
          <button type='button' onClick={() => setDisplaySubMenu(true)}>Add tag</button>
          { displaySubMenu ? <SubMenu setTags={setTempTags} setMenu={setDisplaySubMenu} /> : null }
        </div>
      <div className='add-btns-container flex width-100 edit-btns'>
        <button
          className='form-btn'
          type='button'
          onClick={() => setEdit(false)}>
            Cancel
        </button>
        <button
          type='button'
          className='form-btn'
          onClick={() => {
            const updated = {
              ...data,
              columnId: value === 'label' ? data.columnId : Number(value),
              name: task,
              description,
              tags: tempTags
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
