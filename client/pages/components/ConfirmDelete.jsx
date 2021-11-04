import React from 'react';

const ConfirmDelete = ({ cancel, handleDelete, deleteId }) => {
  return (
    <dialog className='confirm-delete-board' open>
      <h1 className='confirm-heading'>Confirm delete</h1>
      <div className='confirm-text'>Deleting a project board also deletes its columns, tasks, and labels.</div>
      <div className='confirm-buttons '>
      <button onClick={() => cancel()}
          className='confirm-btn gray-text blue-bg no-margin no-padding'>
            Cancel
      </button>
      <button onClick={() => handleDelete(deleteId)}
        className='confirm-btn gray-text blue-bg no-margin no-padding'>
        Delete
      </button>
      </div>
    </dialog>
  );
};

export default ConfirmDelete;
