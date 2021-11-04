import React, { useState, useEffect } from 'react';
import ProjectListItem from './components/ProjectListItem';

const HomeView = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetch('/api/users/1')
      .then(res => {
        // console.log('response:', res)
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        setBoards(data);
      });
  }, []);

  return (
    <div className='container flex flex-col align-center'>
      <h1 className='pink-text semi-bold center-text'>Projects</h1>
      <ul className='no-bullets project-list'>
         {
          boards.map(board => {
            return (
              <ProjectListItem
                    key={board.boardId}
                    board={board} />
            );
          })
        }
      </ul>
      <button className='add-project-btn blue-bg semi-bold pink-text'>
        <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
        New Project
      </button>
    </div>
  );
};

export default HomeView;
