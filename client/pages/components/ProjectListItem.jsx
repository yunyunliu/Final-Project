import React from 'react';

const ProjectListItem = props => {
  // console.log('from ProjectListItem:', board)
  return (
    <li className='project-item'>
        {props.board.name}
      <span className='delete-icon'><i className='fas fa-trash-alt'></i></span>
    </li>
  );
};

export default ProjectListItem;
