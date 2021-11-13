import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className='edit-element'>
        <input value={projectName}
        className='edit-input gray-text'
        onChange={e => handleChange(e)}
        />
        <button type='button'
          className='edit-btn icon-btn source-sans'
          id={boardId}
          onClick={e => {
            setDisplayEdit(false);
            handleEdit(e, projectName);
          }}>Done
        </button>
      </div>
      <button type='button'
      className='edit-btn icon-btn source-sans'
        onClick={() => {
          setDisplayEdit(false);
        }}>Cancel
      </button>
    </>
  );

  const boardName = (
    <div className='link-container'>
      <Link to={`/api/users/1/boards/${boardId}`}>
        <button type='button'
          // id={boardId}
          onDoubleClick={() => setDisplayEdit(true)}
          className='project-item blue-bg semi-bold no-padding btn'>
          <p>{name}</p>
        </button>
      </Link>
    </div>
  );

  return (
    <li className='project-li'>
        {displayEdit ? editInput : boardName}
      <button type='button'
      onClick={() => handleToggle(boardId)}
      style={{ height: 80, width: 80 }}
      className='icon-btn'>
      <i className='fas fa-times'></i>
    </button>
    </li>
  );
};

export default ProjectListItem;
