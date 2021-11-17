import React, { useState, useContext } from 'react';
import BoardContext from '../BoardContext';

import SubMenu from './SubMenu';

const AddForm = ({ setModal, handleAdd, colName }) => {
  const { board } = useContext(BoardContext);
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');
  const [tags, setTags] = useState([]);

  return (
    <dialog className='add-edit-modal' open>
      <form className='add-form flex flex-col align-center'>
        <h2 className='form-name no-margin'>Add new task card</h2>
          <div className='task-col-title'>in <span className='semi-bold pink-text'>{colName}</span></div>
        <label className='width-100 semi-bold'>Task:
          <input className='task-name-input'
            style={{ width: 200 }}
            value={task}
            onChange={({ target }) => setTask(target.value)} />
        </label>
        <label className='description-label width-100 semi-bold'>Task Description:
          <textarea className='task-name-input gray-text source-sans'
            cols='35'
            value={description}
            onChange={({ target }) => setDescription(target.value)} />
        </label>
        <div style={{ fontSize: 16, fontWeight: 600, width: '100%' }}>Tags:</div>
        <div className='flex label-input width-100' style={{ marginTop: 15 }}>
          <SubMenu setTags={setTags} tags={tags} board={board.boardId} />
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
