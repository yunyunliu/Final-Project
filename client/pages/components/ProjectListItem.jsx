import React from 'react';

const ProjectListItem = ({ board, handleToggle }) => {
  const { name, boardId } = board;

  return (
    <li className='project-li'>
      <div className='project-item'>
        <p>{name}</p>
      </div>
      <button type='button'
      onClick={() => handleToggle(boardId)}
        className='icon-btn'>
        <i className='fas fa-times red'></i>
      </button>
    </li>
  );
};

export default ProjectListItem;
