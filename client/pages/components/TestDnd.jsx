import React from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const pokedex = [
  { number: '001', name: 'Bulbasaur' },
  { number: '004', name: 'Charmander' },
  { number: '007', name: 'Squirtle' },
  { number: '025', name: 'Pikachu' },
  { number: '039', name: 'Jigglypuff' }
];

const styles = { width: 100, height: 40, border: '2px solid green', listStyleType: 'none' };

const TestDnd = () => {
  return (
    <DragDropContext>
      <Droppable droppableId='poke'>
        {({ droppableProps, innerRef, placeholder }) => (
          <ul className='poke no-bullets' {...droppableProps} ref={innerRef}>
            {pokedex.map((poke, i) => (
                             <Draggable key={poke.number} draggableId={poke.number} index={i}>
                                {({ innerRef, draggableProps, dragHandleProps }) => (
                                <li className='teal-border-2' ref={innerRef} {...draggableProps} {...dragHandleProps}>
                                {poke.name}
                                </li>)}
                              </Draggable>))}
                                  {placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TestDnd;
