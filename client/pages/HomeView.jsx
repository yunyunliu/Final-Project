import React, { useState, useEffect } from 'react';
import ProjectListItem from './components/ProjectListItem';
import ConfirmDelete from './components/ConfirmDelete';

const HomeView = () => {
  const [boards, setBoards] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  useEffect(() => {
    fetch('/api/users/1/boards/')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        setBoards(data);
      });
  }, []);

  const handleEditBoard = async (id, name) => {
    const boardId = id;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    };
    const response = await fetch(`/api/users/1/boards/${boardId}`, options);
    const data = await response.json();
    const updated = boards.map(board => board.boardId === data.boardId ? data : board);
    setBoards(updated);
  };

  const handleAddNew = async () => {
    const response = await fetch('/api/users/1/boards',
      { method: 'POST' });
    const data = await response.json(); // response.json is async!!
    const updated = [data].concat(boards);
    setBoards(updated);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setToDelete(null);
  };

  const handleDelete = async () => {
    await fetch(`/api/users/1/boards/${toDelete}`,
      { method: 'DELETE' });
    const updated = boards.filter(board => board.boardId !== toDelete);
    setBoards(updated);
    handleCancel();
  };

  return (
    <div className='container flex flex-col align-center'>
      <div className='homeview-header'>
        <div className='column-half justify-center'>
          <h1 style={{ fontSize: '48px', marginTop: 0 }}
            className='pink-text semi-bold'>Projects
          </h1>
        </div>
        <div className='column-half justify-center'>
          <button
            className='add-project-btn blue-bg semi-bold pink-text btn'
            onClick={() => handleAddNew()}>
            <span className='plus-icon-container btn'><i className='fas fa-plus'></i></span>
            New Project
          </button>
        </div>
      </div>
      {displayModal
        ? <ConfirmDelete cancel={handleCancel} deleteId={toDelete} handleDelete={handleDelete} />
        : null}
      <ul className='project-list'>
         {
          boards.map(board => {
            return (
              <ProjectListItem
                    key={board.boardId}
                    board={board}
                    id={board.boardId}
                    setDisplayModal={setDisplayModal}
                    handleEdit={handleEditBoard}
                    setToDelete={setToDelete}
                    />
            );
          })
        }
      </ul>
    </div>
  );
};

export default HomeView;
