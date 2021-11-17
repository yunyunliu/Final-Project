import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectListItem = ({ board, handleToggle, handleEdit }) => {
  const { name, boardId } = board;
  const [projectName, setProjectName] = useState(name);
  const [displayEdit, setDisplayEdit] = useState(false);

  const editInput = (
    <>
      <div className='edit-element'>
        <input value={projectName}
        className='edit-input gray-text'
        onChange={({ target }) => setProjectName(target.value)}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            setDisplayEdit(false);
          }
          if (e.key === 'Enter') {
            setDisplayEdit(false);
            handleEdit(e, projectName);
          }
        }}
        />
        <button type='button'
          className='edit-btn icon-btn source-sans'
          id={boardId}
          onClick={e => {
            setDisplayEdit(false);
            handleEdit(Number(e.target.id), projectName);
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
      <Link to={`/boards/${boardId}`}>
        <button type='button'
          className='project-item blue-bg semi-bold no-padding btn'>
          <p>{name}</p>
        </button>
      </Link>
    </div>
  );

  return (
    <li className='project-li'>
      <button type='button'
        onClick={() => setDisplayEdit(true)}
        style={{ height: 80, width: 80 }}
        className='icon-btn'>
        <i className='fas fa-edit'></i>
      </button>
        {displayEdit ? editInput : boardName}
        {displayEdit
          ? null
          : (<button type='button'
                onClick={() => handleToggle(boardId)}
                style={{ height: 80, width: 80 }}
                className='icon-btn'>
                <i className='fas fa-times'></i>
              </button>)}
    </li>
  );
};

export default ProjectListItem;
