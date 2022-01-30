import React, { useState, useContext } from 'react';
import FocusTrap from 'focus-trap-react';

import BoardContext from '../BoardContext';
import SubMenu from './SubMenu';
import TagList from './TagList';

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
    <FocusTrap>
      <div className='add-edit-modal div-modal'>
        <form className='flex flex-col align-center'>
          <h2 className='no-margin'>Add new task card</h2>
            <div style={{ margin: 10 }}>in <span className='semi-bold pink-text'>{colName}</span></div>
          <label className='width-100 semi-bold'>Task:
            <input className='teal-border-2 gray-text'
              style={{ width: 200, marginLeft: 10 }}
              value={task}
              onChange={({ target }) => setTask(target.value)} required/>
          </label>
          <label className='width-100 semi-bold' style={{ margin: 15 }}>Task Description:
            <textarea className='teal-border-2 source-sans'
              cols='35'
              value={description}
              onChange={({ target }) => setDescription(target.value)} />
          </label>
          <div className='align-center width-100 flex' style={{ justifyContent: 'flex-start' }}>
            <TagList tags={tags} remove={removeTag} />
          </div>
          <div className='flex width-100' style={{ marginBottom: 20 }}>
            <SubMenu setTags={setTags} tags={tags} board={board.boardId} />
          </div>
          <div className='space-between width-100'>
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
      </div>
    </FocusTrap>
  );
};

export default AddForm;
