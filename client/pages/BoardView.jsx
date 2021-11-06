import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Column from './components/Column';

const BoardView = () => {
  // const { boardId } = useParams();
  useEffect(() => {
    // fetch(`/api/users/1/boards/${boardId}/col`)
    fetch('/api/users/1/boards/12/col')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setColumns(data));
  }, []);
  const [columns, setColumns] = useState([]);

  // const handleEdit = () => {

  // };

  const handleDelete = async id => {
    await fetch(`/api/users/1/boards/12/col/${id}`,
      { method: 'DELETE' });
    const updated = columns.filter(col => col.columnId !== id);
    setColumns(updated);
  };

  const handleAdd = async () => {
    const response = await fetch('/api/users/1/boards/12/col', { method: 'POST' });
    const data = await response.json();
    const updated = columns.concat(data);
    setColumns(updated);
  };
  return (
    <div className='flex board-container'>
      {columns.map(col => <Column key={col.columnId}
          data={col}
          handleDelete={handleDelete} />)}
      <button className='add-project-btn blue-bg semi-bold pink-text add-col'
        onClick={() => handleAdd()}>
        <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
        Add Column
      </button>
    </div>
  );
};

export default BoardView;
