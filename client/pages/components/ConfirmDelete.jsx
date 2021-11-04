import React from 'react';

const ConfirmDelete = () => {
  return (
    <dialog className='confirm-delete-board' open>
      <h1 className='confirm-heading'>Confirm delete</h1>
      <div className='confirm-text'>Deleting a project board also deletes its columns, tasks, and labels.</div>
      <div className='confirm-buttons'>
        <button className=''>Confirm</button>
        <button className=''>Cancel</button>
      </div>
    </dialog>
  );
};

export default ConfirmDelete;
