import React, { useState, useEffect } from 'react';
import ProjectListItem from './components/ProjectListItem';
import ConfirmDelete from './components/ConfirmDelete';

const HomeView = () => {
  const [boards, setBoards] = useState([]);
  // refactor this to be in ProjectListItem like update
  const [displayModal, setDisplayModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
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

  const handleEdit = async ({ target }, name) => {
    const boardId = target.id;
    const options = {
      method: 'PATCH',
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
    const updated = boards.concat(data);
    setBoards(updated);
  };

  const handleCancel = () => {
    setDisplayModal(false);
    setToDelete(null);
  };

  const handleDelete = async boardId => {
    await fetch(`/api/users/1/boards/${boardId}`,
      { method: 'DELETE' });
    const updated = boards.filter(board => board.boardId !== boardId);
    setBoards(updated);
    handleCancel();
  };

  const handleDeleteClick = id => {
    setToDelete(id);
    setDisplayModal(true);
  };

  return (
    <div className='container flex flex-col align-center'>
      <h1 className='pink-text semi-bold center-text'>Projects</h1>
      {displayModal
        ? <ConfirmDelete cancel={handleCancel} deleteId={toDelete} handleDelete={handleDelete} />
        : null}
      <ul className='no-bullets project-list'>
         {
          boards.map(board => {
            return (
              <ProjectListItem
                    key={board.boardId}
                    board={board}
                    handleToggle={handleDeleteClick}
                    handleEdit={handleEdit}
                    />
            );
          })
        }
      </ul>
      <button className='add-project-btn blue-bg semi-bold pink-text'
        onClick={() => handleAddNew()}>
        <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
        New Project
      </button>
    </div>
  );
};

export default HomeView;
