import React from 'react';

const ProjectListItem = ({ board }) => {
  return (
    <li className='project-item'>
        {board.name}
      <span className='delete-icon'><i className='fas fa-trash-alt'></i></span>
    </li>
  );
};

export default ProjectListItem;
