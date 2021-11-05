import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Column from './components/Column';

const board = {
  name: 'secret plans',
  boardId: 13,
  userId: 1
};

const BoardView = () => {
  // const { boardId } = useParams();
  // const [board, setBoard] = useState({});
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
      <Column data={board}/>
    </div>
  );
};

export default BoardView;
