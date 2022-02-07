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
      <dialog className='add-edit-modal' style={{ top: '20%' }} open>
        <form className='flex flex-col align-center'>

          <h2 className='no-margin'>Add new task card</h2>
          <div style={{ margin: 10 }}>in <span className='semi-bold pink-text'>{colName}</span></div>


          {/* task name */}
          <label className='width-100 semi-bold' style={{ marginBottom: 15 }}>Task:  </label>
            <input className='teal-border-2 gray-text'
              style={{ width: 300, height: 30, fontSize: 16 }}
              value={task}
              onChange={({ target }) => setTask(target.value)} required/>
          {/* task description */}
          <label className='width-100 semi-bold' style={{ marginTop: 15, marginBottom: 15 }}>Task Description: </label>
            <textarea className='teal-border-2 source-sans'
              style={{ width: 300, height: 75, fontSize: 16 }}
              value={description}
              onChange={({ target }) => setDescription(target.value)} />
          {/* selected tags */}
          {/* <div className='align-center width-100 flex' style={{ justifyContent: 'flex-start' }}>
            <TagList tags={tags} remove={removeTag} />
          </div> */}
          {/* list of colors */}
          {/* <div className='flex width-100' style={{ marginBottom: 20 }}>
            <SubMenu setTags={setTags} tags={tags} board={board.boardId} />
          </div> */}



          {/* buttons */}
          <div className='space-between width-100' style={{ marginTop: 15 }}>
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
    </FocusTrap>
  );
};

export default AddForm;
