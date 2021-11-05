import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Column from './components/Column';

const board = {
  name: 'secret plans',
  boardId: 13,
  columns: [{ name: 'todo' }, { name: 'in progress' }, { name: 'complete' }],
  userId: 1
};

const BoardView = () => {
  // const { boardId } = useParams();
  // const [columns, setColumns] = useState(null);
  // setBoard(boardData);
  // useEffect(() => {
  //   fetch(`/api/users/1/boards/${boardId}`)
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then(data => setBoard(data));
  // }, []);
  return (
    <div className='container flex'>
      {board.columns.map(col => <Column key={col.name} data={col}/>)}
    </div>
  );
};

export default BoardView;
