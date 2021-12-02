import React from 'react';

const ConfirmDelete = ({ cancel, handleDelete, deleteId }) => {
  return (
    <dialog className='flex flex-col align-center gray-text'
      style={{ width: 300, border: '3px solid #1db9c3' }}>
      <h1 style={{ fontSize: 24 }}>Confirm delete</h1>
      <div className='center-text' style={{ fontSize: 18 }}>
        Deleting a project board also deletes its columns, tasks, and labels.
      </div>
      <div className='space-between width-100' style={{ marginTop: 20 }}>
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
