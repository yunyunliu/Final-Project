import React from 'react';
import ProjectListItem from './components/ProjectListItem';

const HomeView = ({ boards }) => {
  return (
    <div className='container flex flex-col align-center'>
      <h1 className='pink-text semi-bold center-text'>Projects</h1>
      <ul className='no-bullets board-list no-padding'>
         { boards.map(board => <ProjectListItem className='project-item' key={board.id} board={board} />) }
      </ul>
      <button className='add-project-btn pink-text blue-bg'>
        <span className='icon-container'><i className='fas fa-plus'></i></span>
        New Project
      </button>
    </div>
  );
};

export default HomeView;
