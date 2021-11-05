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
    <>
    {/* needs to respond to clicks and double clicks */}
    <Link to={`/api/users/1/boards/${boardId}`}
      className='blue-bg gray-text semi-bold board-link'>View</Link>
    <button type='button'
      id={boardId}
      onDoubleClick={() => setDisplayEdit(true)}
      className='project-item blue-bg semi-bold no-padding'>
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
