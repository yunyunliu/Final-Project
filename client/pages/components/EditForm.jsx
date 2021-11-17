import React, { useState, useEffect, useContext } from 'react';

import BoardContext from '../BoardContext';
import SubMenu from './SubMenu';

const EditForm = ({ data, setEdit, handleEdit, colName, expanded, setExpanded }) => {
  const { board } = useContext(BoardContext);

  // const [displaySubMenu, setDisplaySubMenu] = useState(false);
  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description ? data.description : '');
  const [value, setValue] = useState('label');
  const [tags, setTags] = useState(data.tags);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [toAdd, setToAdd] = useState('');

  const getSelected = id => {
    const selected = options.find(opt => opt.tagId === id);
    return selected;
  };

  const removeTag = async tagId => {
    const response = await fetch(`/api/cards/${data.cardId}/remove/${tagId}`, { method: 'DELETE' });
    if (response.ok) {
      const updatedTags = tags.filter(tag => tag.tagId !== tagId);
      setTags(updatedTags);
    }
  };

  useEffect(() => {
    fetch(`/api/tags/${board.boardId}`)
      .then(response => response.json())
      .then(tags => setOptions(tags))
      .catch(err => console.error(err.message));
  }, []);

  const backButton = (
    <button
      type='button'
      style={{ backgroundColor: 'white', border: 'none', fontSize: 20 }}
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
      <div className='edit-form-header'>
      {expanded ? backButton : null}
        <h2 className='no-margin'>Edit task card</h2>
        <button type='button' className='close-edit-btn' onClick={() => setEdit(false)}><i className='fas fa-times'></i></button>
      </div>
      <div className='task-col-title'> in <span className='pink-text semi-bold'>{colName}</span></div>
      <label className='width-100 semi-bold'>Task:
        <input className='task-name-input'
          value={task}
          onChange={({ target }) => setTask(target.value)} />
      </label>
      <label className='description-label width-100 semi-bold'>Task Description:
        <textarea className='task-name-input gray-text source-sans description-input'
          value={description}
          cols='35'
          onChange={({ target }) => setDescription(target.value)} />
      </label>
      <label className='semi-bold width-100'> Move Card:
        <select className='col-select'
            value={value}
            onChange={({ target }) => {
              setValue(Number(target.value));
            }}>
          <option value='label'>Choose column</option>
          {board.columns.map(col => <option key={col.columnId} value={col.columnId}>{col.name}</option>)}
        </select>
      </label>
      <div className='tag-section flex'>
        <span className='semi-bold' style={{ marginRight: 10 }}>Tags:</span>
       {tags.map(tag => (<div key={tag.tagId}
                            className={`${tag.color} card-label tooltip`}
                            style={{ backgroundColor: tag.color }}>
                              <span className='tooltiptext'> {tag.text}
                                {/* <button type='button' className='remove-tag-btn' onClick={() => removeTag(tag.tagId)}><i className='fas fa-times tooltip-icon'></i></button> */}
                              </span>
                        </div>))}

      </div>
      {/* <button type='button' onClick={() => setDisplay(true)} className='btn form-btn'>Add Tags</button>
          {display ? <SubMenu setTags={setTags} tags={tags} /> : null} */}
      <div>
      <label className='semi-bold width-100'> Add tag
        <select
          value={toAdd}
          onChange={({ target }) => setToAdd(target.value) }>
            {options.map(opt => (
              <option key={opt.tagId}
                className={opt.color}
                value={opt.tagId}>{opt.text}</option>))}
        </select>
      </label>
      <div style={{ width: 40, height: 20 }}></div>
      </div>

      <div className='flex width-100 edit-btns'>
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
