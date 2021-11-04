import React from 'react';

const ConfirmDelete = ({ cancel, handleDelete }) => {
  return (
    <dialog className='confirm-delete-board' open>
      <h1 className='confirm-heading'>Confirm delete</h1>
      <div className='confirm-text'>Deleting a project board also deletes its columns, tasks, and labels.</div>
      <div className='confirm-buttons'>
        <button onClick={() => handleDelete()}>
          Delete
        </button>
        <button onClick={() => cancel()}>Cancel</button>
      </div>
    </dialog>
  );
};

export default ConfirmDelete;
