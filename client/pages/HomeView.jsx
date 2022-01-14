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
      .then(data => setBoards(data));
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
    const updated = boards.map(board => board.id === data.id ? data : board);
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
    const res = await fetch(`/api/users/1/boards/${toDelete}`,
      { method: 'DELETE' });
    if (res.ok) {
      const updated = boards.filter(board => board.id !== toDelete);
      setBoards(updated);
    }
    handleCancel();
  };
  if (boards) {
    return (
      <div className=' flex flex-col align-center '>
        <div className='homeview-header'>
          <div className='column-half justify-center'>
            <h1 style={{ fontSize: 52, marginTop: 0 }}
              className='pink-text semi-bold'>Projects
            </h1>
          </div>
          <div className='column-half justify-center'>
            <button
              className='add-project-btn blue-bg semi-bold pink-text'
              onClick={() => handleAddNew()}>
              <span style={{ marginRight: 10 }}><i className='fas fa-plus'></i></span>
              New Project
            </button>
          </div>
        </div>
        {displayModal
          ? <ConfirmDelete cancel={handleCancel} deleteId={toDelete} handleDelete={handleDelete} />
          : null}
        {boards.length > 0
          ? (<ul className='project-list'>
          {boards.map(board => {
            return (
              <ProjectListItem
                    key={board.id}
                    board={board}
                    // id={board.id}
                    setDisplayModal={setDisplayModal}
                    handleEdit={handleEditBoard}
                    setToDelete={setToDelete}
                    />
            );
          })}
        </ul>)
          : (<div style={{ fontSize: 32 }}>You currently have no projects.</div>)
        }
      </div>
    );
  }
  return (
    <div className='justify-center align-center' style={{ minHeight: 500 }}>
      <img src='/images/Dual Ring-1s-200px.gif' alt='spinner' />
    </div>
  );
};

export default HomeView;
