import React from 'react';

const ProjectListItem = ({ board, toggleShow }) => {
  const { name, boardId } = board;

  return (
    <li className='project-li'>
      <div className='project-item'>
        <p>{name}</p>
      </div>
      <button type='button'
      onClick={() => toggleShow()}
        className='icon-btn'>
        <i className='fas fa-times red'></i>
      </button>
    </li>
  );
};

export default ProjectListItem;
