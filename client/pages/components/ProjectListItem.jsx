import React, { useState } from 'react';

const ProjectListItem = ({ board, handleToggle }) => {
  const { name, boardId } = board;
  const [projectName, setProjectName] = useState(name);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);

  const handleChange = ({ target }) => {
    const text = target.value;
    setProjectName(text);
  };

  const handleEdit = async ({ target }) => {
    setDisplayEdit(false);
    // console.log('targetId:', e.target.id)
    const boardId = target.id;
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: projectName })
    };
    const response = await fetch(`/api/users/1/boards/${boardId}`, options);
    const data = await response.json();
    console.log('response data:', data);
  };

  const editInput = (
    <>
      <div>
        <input value={projectName}
        onChange={e => handleChange(e)}
        />
        <button type='button'
          id={boardId}
          onClick={e => handleEdit(e)}>Done</button>
      </div>
      <button type='button' onClick={() => setDisplayEdit(false)}>cancel</button>
    </>
  );

  const boardName = (
    <>
      <button type='button'
        id={boardId}
        className='project-item blue-bg semi-bold no-padding'
        onDoubleClick={e => setDisplayEdit(true)}>
        <p>{name}</p>
      </button>
      <button type='button'
        onClick={() => handleToggle(boardId)}
        className='icon-btn'>
        <i className='fas fa-times'></i>
      </button>
    </>
  );
  return (
    <li className='project-li'>
        {displayEdit ? editInput : boardName}
    </li>
  );
};

export default ProjectListItem;
