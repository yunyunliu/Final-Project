import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BoardView = () => {
  const { boardId } = useParams();

  // useEffect(() => {
  //   // const { boardId } = useParams();
  //   fetch(`/api/users/1/board/${boardId}`)
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then(data => console.log('board data:', data));
  // }, []);
  return (
    <div>boardview!!!</div>
  );
};

export default BoardView;
