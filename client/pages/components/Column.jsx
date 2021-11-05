import React from 'react';

const Column = ({ data }) => {
  // const handleAdd = async ({ data }) => {
  //   const response = await fetch('/api/users/1/boards/12/col', { method: 'POST' });
  // }
  return (
    <div className='col'>
      <div className='col-header flex align-center'>
        <h2 className='col-name'>{data.name}</h2>
        <button type='button' className='no-border col-btn'>
          <i className='fas fa-times col-icon semi-bold gray-text'></i>
        </button>
      </div>
      <button className='add-project-btn blue-bg semi-bold pink-text add-col'>
        <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
        Add Column
      </button>
    </div>
  );
};

export default Column;
