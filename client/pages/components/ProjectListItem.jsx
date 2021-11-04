import React from 'react';

const ProjectListItem = props => {
  return (
    <li className='project-li'>
      <div className='project-item'>
        <p>{props.board.name}</p>
      </div>
      <i className='fas fa-times red'></i>
    </li>
  );
};

export default ProjectListItem;
