import React, { useState, useContext } from 'react';
import BoardContext from '../BoardContext';

import SubMenu from './SubMenu';

const AddForm = ({ setModal, handleAdd, colName }) => {
  const { board } = useContext(BoardContext);
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');
  const [tags, setTags] = useState([]);

  const removeTag = tagId => {
    const removed = tags.filter(tag => tag.tagId != tagId);
    setTags(removed);
  };

  return (
    <dialog className='add-edit-modal' open>
      <form className='flex flex-col align-center'>
        <h2 className='no-margin'>Add new task card</h2>
          <div style={{ margin: 10 }}>in <span className='semi-bold pink-text'>{colName}</span></div>
        <label className='width-100 semi-bold'>Task:
          <input className='teal-border-2 gray-text'
            style={{ width: 200, marginLeft: 10 }}
            value={task}
            onChange={({ target }) => setTask(target.value)} />
        </label>
        <label className='width-100 semi-bold' style={{ margin: 15 }}>Task Description:
          <textarea className='teal-border-2 source-sans'
            cols='35'
            value={description}
            onChange={({ target }) => setDescription(target.value)} />
        </label>
        <div className='tag-section flex'>
          <span className='semi-bold' style={{ marginRight: 10, alignSel: 'flex-start' }}>Tags:</span>
          <div className='flex'>
          <ul className='no-bullets no-margin no-padding'>
            {tags.map(tag => (
              <li key={tag.tagId} style={{ display: 'inline-block', margin: 2 }}>
                <div className='flex'>
                  <div className={`${tag.color}`} style={{ textAlign: 'center' }}>{tag.text}</div>
                  <button type='button'
                    className='no-border white-bg'
                    style={{ marginLeft: 2, fontSize: 10 }}
                    onClick={() => removeTag(tag.tagId)}
                    ><i className='fas fa-times' style={{ marginLeft: 5 }}></i></button>
                </div>
              </li>))}
          </ul>
        </div>
      </div>
        <div className='flex width-100' style={{ marginBottom: 20 }}>
          <SubMenu setTags={setTags} tags={tags} board={board.boardId} />
        </div>
        <div className='add-btns-container flex width-100'>
          <button
            className='form-btn'
            type='button'
            onClick={() => setModal(false)}>
              Cancel
          </button>
          <button
            type='button'
            className='form-btn'
            onClick={() => {
              setModal(false);
              handleAdd(task, description, tags);
            }} >
            Done
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default AddForm;
