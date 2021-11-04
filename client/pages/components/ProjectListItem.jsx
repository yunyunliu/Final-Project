import React from 'react';

const ProjectListItem = props => {
  return (
    <li className='project-li'>
      <div className='project-item'>
        <p>{props.board.name}</p>
      </div>
      <button type='button'
        className='icon-btn'>
        <i className='fas fa-times red'></i>
      </button>
    </li>
  );
};

export default ProjectListItem;
