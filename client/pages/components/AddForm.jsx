import React, { useState } from 'react';

import SubMenu from './SubMenu';

const AddForm = ({ setModal, handleAdd, colName }) => {
  const [description, setDescription] = useState('');
  const [task, setTask] = useState(null);
  const [displaySubMenu, setDisplaySubMenu] = useState(true);
  const [tags, setTags] = useState([]);

  return (
    <dialog className='add-edit-modal' open>
      {/* {console.log(styles)} */}
      <form className='add-form flex flex-col align-center'>
        <h2 className='form-name no-margin'>Add new task card</h2>
          <div className='task-col-title'>in <span className='semi-bold pink-text'>{colName}</span></div>
        <label className='width-100 semi-bold'>Task:
          <input className='task-name-input'
          style={{ width: 200}}
            onChange={({ target }) => setTask(target.value)} />
        </label>
        <label className='description-label width-100 semi-bold'>Task Description:
          <textarea className='task-name-input gray-text source-sans'
            cols='35'
            value={description}
            onChange={({ target }) => setDescription(target.value)} />
        </label>
        <div className='flex label-input width-100'>
          Tags:
          <div className='expanded-tag-container flex'>
          {tags.length > 0
            ? tags.map(tag => (
              <div key={tag.tagId} style={{ backgroundColor: tag.color }} className={`${tag.color} expanded-tags`}>{tag.text}</div>
            ))
            : null}
            <button type='button' onClick={() => setDisplaySubMenu(true)} style={{ marginLeft: 10 }} className='form-btn'>Add tag</button>
        </div>
          { displaySubMenu ? <SubMenu setTags={setTags} tags={tags} setMenu={setDisplaySubMenu} /> : null }
        </div>
        <div className='add-btns-container flex width-100'>
          <button
            className='add-form-btn form-btn btn'
            type='button'
            onClick={() => setModal(false)}>
              Cancel
          </button>
          <button
            type='button'
            className='btn form-btn pink-text no-border blue-bg gray-text semi-bold'
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
