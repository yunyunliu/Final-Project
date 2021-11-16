import React, { useState, useContext } from 'react';
import BoardContext from '../BoardContext';

import SubMenu from './SubMenu';

const AddForm = ({ setModal, handleAdd, colName }) => {
  const { board } = useContext(BoardContext);
  const [description, setDescription] = useState('');
  const [task, setTask] = useState(null);
  // const [displaySubMenu, setDisplaySubMenu] = useState(false);
  const [tags, setTags] = useState([]);

  return (
    <dialog className='add-edit-modal' open>
      <form className='add-form flex flex-col align-center'>
        <h2 className='form-name no-margin'>Add new task card</h2>
          <div className='task-col-title'>in <span className='semi-bold pink-text'>{colName}</span></div>
        <label className='width-100 semi-bold'>Task:
          <input className='task-name-input'
          style={{ width: 200 }}
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
          <SubMenu setTags={setTags} tags={tags} board={board.boardId} />
          <div className='expanded-tag-container flex'>
          {tags.length > 0
            ? tags.map(tag => (<div key={tag.tagId}
              className={`${tag.color} card-label tooltip`}
              style={{ backgroundColor: tag.color }}>
                <span className='tooltiptext'> {tag.text}
                  <button type='button' className='remove-tag-btn' onClick={() => removeTag(tag.tagId)}><i className='fas fa-times tooltip-icon'></i></button>
                </span>
          </div>))
            : null}

          </div>

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
