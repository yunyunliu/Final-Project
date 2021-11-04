import React, { useState, useEffect } from 'react';
import ProjectListItem from './components/ProjectListItem';
// import ConfirmDelete from './components/ConfirmDelete';

const HomeView = () => {
  const [boards, setBoards] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch('/api/users/1/boards')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        setBoards(data);
      });
  }, []);

  const handleClick = async () => {
    const response = await fetch('/api/users/1/boards',
      { method: 'POST' });
    const data = await response.json(); // response.json is async!!
    const updated = boards.concat(data);
    setBoards(updated);
  };

  const handleDelete = async boardId => {
    await fetch(`/api/users/1/boards/${boardId}`,
      { method: 'DELETE' });
    const updated = boards.filter(board => board.boardId !== boardId);
    setBoards(updated);
  };

  // const toggleModal = () => {
  //   setShow(!show);
  // };

  return (
    <div className='container flex flex-col align-center'>
      <h1 className='pink-text semi-bold center-text'>Projects</h1>
      {
        // show ? <ConfirmDelete /> : null
      }
      <ul className='no-bullets project-list'>
         {
          boards.map(board => {
            return (
              <ProjectListItem
                    key={board.boardId}
                    board={board}
                    handleDelete={handleDelete}
                    />
            );
          })
        }
      </ul>
      <button className='add-project-btn blue-bg semi-bold pink-text'
        onClick={e => handleClick(e)}>
        <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
        New Project
      </button>
    </div>
  );
};

export default HomeView;
