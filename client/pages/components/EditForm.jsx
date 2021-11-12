import React, { useState, useContext } from 'react';

import BoardContext from '../BoardContext';
import SubMenu from './SubMenu';

const EditForm = ({ data, setEdit, handleEdit, colName, expanded, setExpanded }) => {
  const { board } = useContext(BoardContext);

  const [displaySubMenu, setDisplaySubMenu] = useState(false);
  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description ? data.description : '');
  const [value, setValue] = useState('label');
  const [tags, setTags] = useState(data.tags);

  const backButton = (
    <button
      type='button'
      style={{ backgroundColor: 'white', border: 'none', marginRight: 20 }}
      onClick={() => {
        setEdit(false);
        setExpanded(true);
      }}
      className='btn'><i className="fas fa-arrow-left"></i>
    </button>
  );

  return (
  <dialog className='add-edit-modal' open>
    <form className='flex edit-form flex-col align-center'>
      <div className='flex'>
      {expanded ? backButton : null}
        <h2 className='form-name no-margin'>Edit task card</h2>
      </div>
      <div className='task-col-title'> in <span className='pink-text semi-bold'>{colName}</span></div>
      <label className='width-100 semi-bold'>Task:
        <input className='task-name-input'
          value={task}
          onChange={({ target }) => setTask(target.value)} />
      </label>
      <div className='tag-section flex'>
          {tags.map(tag => (<div
            key={tag.tagId}
            className={`${tag.color} card-label`}
            style={{ backgroundColor: tag.color }}
            > </div>))}
        </div>
      <label className='description-label width-100 semi-bold'>Task Description:
        <textarea className='task-name-input gray-text source-sans description-input'
          value={description}
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
      <div className='flex'>
          <button type='button' onClick={() => setDisplaySubMenu(true)} className='btn'>Add tag</button>
          { displaySubMenu ? <SubMenu setTags={setTags} setMenu={setDisplaySubMenu} tags={tags} /> : null }
        </div>
      <div className='add-btns-container flex width-100 edit-btns'>
        <button
          className='form-btn btn'
          type='button'
          onClick={() => setEdit(false)}>
            Cancel
        </button>
        <button
          type='button'
          className='form-btn btn'
          onClick={() => {
            const updated = {
              ...data,
              columnId: value === 'label' ? data.columnId : Number(value),
              name: task,
              description,
              tags
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
