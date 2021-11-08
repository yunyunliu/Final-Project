import React, { useState } from 'react';

const Column = ({ data, handleDelete, handleEdit }) => {
  const [colName, setColName] = useState(data.name);
  const [displayEdit, setDisplayEdit] = useState(false);

  const editCol = (
    <div className='edit-col'>
      <input value={colName}
        className='col-edit-input'
        onChange={({ target }) => setColName(target.value)}
        />
        <div className='edit-btn-container gray-text'>
          <button type='button'
            className='edit-col-btn'
            onClick={() => setDisplayEdit(false)}>
            Cancel
          </button>
          <button type='button'
            className='edit-col-btn gray-text'
            onClick={() => {
              setDisplayEdit(false);
              handleEdit(data.columnId, colName);
            }}>
            Done
          </button>
        </div>
    </div>
  );

  const columnName = (
    <div className='col-header flex align-center'>
        <button type='button'
          className='col-name-btn'
          onDoubleClick={() => setDisplayEdit(true)}>
          <h2 className='col-name gray-text'>{data.name}</h2>
        </button>
        <button type='button'
          className='no-border col-btn'
          onClick={() => handleDelete(data.columnId)}>
          <i className='fas fa-times col-icon semi-bold gray-text'></i>
        </button>
      </div>
  );

  return (
    <div className='col'>
      { displayEdit ? editCol : columnName }
    </div>
  );
};

export default Column;
