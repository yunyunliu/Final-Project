import React, { useState } from 'react';

const ProjectListItem = ({ board, handleToggle }) => {
  const { name, boardId } = board;
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState(name);

  const handleEdit = e => {

  };

  const handleChange = ({ target }) => {
    const text = target.value;
    setProjectName(text);
  };

  const editInput = (
    <>
      <div>
        {console.log(projectName)}
        <input value={projectName}
        onChange={e => handleChange(e)} />
        <button type='button'
        onClick={() => handleEdit()}>Done</button>
      </div>
      <button type='button'
      onClick={() => setIsEditing(false)}>cancel</button>
    </>

  );
  const boardName = (
    <>
      <button type='button'
        id={board.boardId}
        className='project-item blue-bg semi-bold no-padding'
        onClick={e => setIsEditing(true)}>
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
        {isEditing ? editInput : boardName}
    </li>
  );
};

export default ProjectListItem;
