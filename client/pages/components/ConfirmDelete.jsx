import React from 'react';

const ConfirmDelete = ({ cancel, handleDelete, deleteId }) => {
  return (
    <dialog className='confirm-delete-board'>
      <h1 className='confirm-heading'>Confirm delete</h1>
      <div className='confirm-text'>Deleting a project board also deletes its columns, tasks, and labels.</div>
      <div className='confirm-buttons '>
      <button onClick={() => cancel()}
          className='form-btn'>
            Cancel
      </button>
      <button onClick={() => handleDelete(deleteId)}
        className='form-btn'>
        Delete
      </button>
      </div>
    </dialog>
  );
};

export default ConfirmDelete;
