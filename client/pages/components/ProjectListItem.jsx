import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectListItem = ({ board, handleToggle, handleEdit, setToDelete, setDisplayModal }) => {
  const { name, boardId } = board;
  const [projectName, setProjectName] = useState(name);
  const [displayEdit, setDisplayEdit] = useState(false);

  const editInput = (
    <li className='project-li'>
      <div className='flex align-center' style={{ height: 70 }}>
        <input value={projectName}
        className='gray-text teal-border-2 border-r3'
        id={boardId}
        style={{ height: '100%', textIndent: 8, fontSize: 22 }}
        onChange={({ target }) => setProjectName(target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setDisplayEdit(false);
            handleEdit(Number(e.target.id), projectName);
          }
        }}
        />
        <button type='button'
          className='icon-btn'
          style={{ height: 70 }}
          id={boardId}
          onClick={e => {
            setDisplayEdit(false);
            handleEdit(Number(e.target.id), projectName);
          }}>Done
        </button>
      </div>
      <button type='button'
      className='icon-btn'
        style={{ height: 70 }}
        onClick={() => {
          setDisplayEdit(false);
        }}>Cancel
      </button>
    </li>
  );

  const boardName = (
    <div style={{ width: 350, height: 80 }}>
      <Link to={`/boards/${boardId}`}>
        <button type='button'
          className='project-item blue-bg semi-bold'>
          <p>{name}</p>
        </button>
      </Link>
    </div>
  );

  return (
    <li className='project-li column-third'>
      {/* <button type='button'
        onClick={() => setDisplayEdit(true)}
        style={{ height: 80, width: 80 }}
        className='icon-btn'>
        <i className='fas fa-edit'></i>
      </button> */}
        {/* {displayEdit ? editInput : boardName} */}
        {/* {displayEdit
          ? null
          : (<button type='button'
                onClick={() => {
                  setToDelete(boardId);
                  setDisplayModal(true);
                }}
                style={{ height: 80, width: 80 }}
                className='icon-btn'>
                <i className='fas fa-times'></i>
              </button>)} */}
      <Link to={`/boards/${boardId}`}>
        <button type='button'
          className='project-link blue-bg semi-bold'>
          <p>{name}</p>
        </button>
      </Link>
    </li>
  );
};

export default ProjectListItem;
