import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Column from './components/Column';

const board = {
  name: 'secret plans',
  boardId: 13,
  columns: [{ name: 'todo' }, { name: 'in progress' }, { name: 'complete' }],
  userId: 1
};

const BoardView = () => {
  // const { boardId } = useParams();
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    fetch('/api/users/1/boards/12/col')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => setColumns(data));
  }, []);
  const handleAdd = async () => {
    const response = await fetch('/api/users/1/boards/12/col', { method: 'POST' });
    const data = await response.json();
    const updated = columns.concat(data);
    setColumns(updated);
  };
  return (
    <div className='container flex board-container'>
      {board.columns.map(col => <Column key={col.name} data={col}/>)}
      <button className='add-project-btn blue-bg semi-bold pink-text add-col'
        onClick={() => handleAdd()}>
        <span className='plus-icon-container'><i className='fas fa-plus'></i></span>
        Add Column
      </button>
    </div>
  );
};

export default BoardView;
