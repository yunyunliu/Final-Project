import React, { useState } from 'react';

const ProjectListItem = ({ board, handleToggle, handleEdit }) => {
  const { name, boardId } = board;
  const [projectName, setProjectName] = useState(name);
  const [displayEdit, setDisplayEdit] = useState(false);

  const handleChange = ({ target }) => {
    const text = target.value;
    setProjectName(text);
  };

  const editInput = (
    <>
      <div>
        <input value={projectName}
        onChange={e => handleChange(e)}
        />
        <button type='button'
          id={boardId}
          onClick={e => {
            setDisplayEdit(false);
            handleEdit(e, projectName);
          }}>Done
        </button>
      </div>
      <button type='button'
        onClick={() => {
          setDisplayEdit(false);
        }}>cancel
      </button>
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
