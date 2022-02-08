import React, { useState, useContext } from 'react';
import FocusTrap from 'focus-trap-react';

import BoardContext from '../BoardContext';
import SubMenu from './SubMenu';
import TagList from './TagList';

const EditForm = ({ data, setEdit, handleEdit, colName }) => {
  const { board } = useContext(BoardContext);

  const [task, setTask] = useState(data.name);
  const [description, setDescription] = useState(data.description ? data.description : '');
  const [value, setValue] = useState('label');
  const [tags, setTags] = useState(data.tags);

  const removeTag = async tagId => {
    const response = await fetch(`/api/cards/${data.cardId}/remove/${tagId}`, { method: 'DELETE' });
    if (response.ok) {
      const updatedTags = tags.filter(tag => tag.tagId !== tagId);
      setTags(updatedTags);
    }
  };

  return (
    <FocusTrap>
      <dialog className='add-edit-modal' style={{ top: '20%', position: 'fixed', padding: 20 }} open >
        <button type='button' className='close-edit-btn' onClick={() => setEdit(false)}>
            <i className='fas fa-times'></i>
          </button>
        <div className='edit-form-header '>
          <h2 className='no-margin'>Edit task card</h2>
          <div> in <span className='pink-text semi-bold'>{colName}</span></div>
        </div>
        <form className='flex align-center' style={{ paddingTop: 20 }}>
          <div style={{ minHeight: 315, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <label className='width-100 semi-bold' htmlFor='task-name'>Task:</label>
              <input
                className='teal-border-2'
                value={task}
                id='task-name'
                style={{ height: 25, textIndent: 3 }}
                onChange={({ target }) => setTask(target.value)} required/>
            <label className='width-100 semi-bold' htmlFor='task-description'>Task Description:</label>
              <textarea className='teal-border-2 gray-text source-sans'
                value={description}
                cols='35'
                rows='5'
                style={{ textIndent: 3 }}
                onChange={({ target }) => setDescription(target.value)}
                id='task-description' />
            <div style={{ marginTop: 15 }}>
              <button
                type='button'
                className='form-btn'
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
          </div>
          <div style={{ paddingLeft: 20 }}>
            <label className='semi-bold width-100' style={{ marginBottom: 10 }}> Move Card:
              <select className='teal-border-2'
                  style={{ marginTop: 10, marginBottom: 10, height: 25 }}
                  value={value}
                  onChange={({ target }) => {
                    setValue(Number(target.value));
                  }}>
                <option value='label'>Choose column</option>
                {board.columns.map(col => <option key={col.columnId} value={col.columnId}>{col.name}</option>)}
              </select>
            </label>
            <div className='align-center width-100 flex' style={{ marginBottom: 20, justifyContent: 'flex-start' }}>
              <TagList tags={tags} remove={removeTag} />
            </div>
            <SubMenu setTags={setTags} tags={tags} />
          </div>
        </form>
      </dialog>
    </FocusTrap>

  );
};

export default EditForm;
