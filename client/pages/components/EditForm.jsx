import React, { useState, useContext } from 'react';

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
  <dialog className='add-edit-modal' open>
    <form className='flex flex-col align-center'>
      <div className='edit-form-header'>
        <h2 className='no-margin'>Edit task card</h2>
        <button type='button' className='close-edit-btn' onClick={() => setEdit(false)}><i className='fas fa-times'></i></button>
      </div>
      <div> in <span className='pink-text semi-bold'>{colName}</span></div>
      <label className='width-100 semi-bold'>Task:
        <input style={{ margin: 10 }}
          className='teal-border-2'
          value={task}
          onChange={({ target }) => setTask(target.value)} required/>
      </label>
      <label className='width-100 semi-bold' style={{ margin: 15 }}>Task Description:
        <textarea className='teal-border-2 gray-text source-sans'
          style={{ marginTop: 10 }}
          value={description}
          cols='35'
          rows='5'
          onChange={({ target }) => setDescription(target.value)} />
      </label>
      <label className='semi-bold width-100' style={{ marginBottom: 10 }}> Move Card:
        <select className='teal-border-2'
            style={{ margin: 10 }}
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
      <div className='flex width-100' style={{ marginTop: 15, flexDirection: 'row-reverse' }}>
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
    </form>
  </dialog>
  );
};

export default EditForm;
