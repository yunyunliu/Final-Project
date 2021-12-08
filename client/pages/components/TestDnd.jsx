import React, { useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const pokedex = [
  { number: '001', name: 'Bulbasaur' },
  { number: '004', name: 'Charmander' },
  { number: '007', name: 'Squirtle' },
  { number: '025', name: 'Pikachu' },
  { number: '039', name: 'Jigglypuff' }
];

const TestDnd = () => {
  const [pokelist, setPokeList] = useState(pokedex);
  const handleOnDragEnd = result => {
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const pokeId = result.draggableId;
    const copy = pokelist.slice();
    const [moved] = copy.splice(sourceIndex, 1); // splice returns an array containing removed items
    copy.splice(destIndex, 0, moved);
    setPokeList(copy);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='poke'>
        {({ droppableProps, innerRef, placeholder }) => (
          <ul className='poke no-bullets' {...droppableProps} ref={innerRef}>
            {pokelist.map((poke, i) => (
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
