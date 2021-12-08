import React, { useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TestDnd = () => {
  const [dex, setDex] = useState({
    kanto: [
      { number: '001', name: 'Bulbasaur', order: 1 },
      { number: '004', name: 'Charmander', order: 2 },
      { number: '007', name: 'Squirtle', order: 3 },
      { number: '025', name: 'Pikachu', order: 4 },
      { number: '039', name: 'Jigglypuff', order: 5 }
    ],
    sinnoh: [
      { number: '387', name: 'Turtwig', order: 1 },
      { number: '390', name: 'Chimchar', order: 2 },
      { number: '393', name: 'Piplup', order: 3 },
      { number: '397', name: 'Staravia', order: 4 },
      { number: '399', name: 'Bidoof', order: 5 }
    ]
  });

  const handleOnDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    // console.log('results:', result)
    const sourceI = source.index;
    const destI = destination.index;
    const itemId = draggableId;
    if (destination.droppableId === source.droppableId) {
      // move card within same column
      const list = dex[destination.droppableId].slice();
      const [reordered] = list.splice(sourceI, 1);
      list.splice(destI, 0, reordered);
      setDex({ ...dex, [destination.droppableId]: list });
    } else {
      // move card between columns
      const srcList = dex[source.droppableId].slice();
      const [moved] = srcList.splice(sourceI, 1);
      const destList = dex[destination.droppableId].slice();
      destList.splice(destI, 0, moved);
      setDex({ [source.droppableId]: srcList, [destination.droppableId]: destList });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='kanto'>
        {({ droppableProps, innerRef, placeholder }) => (
          <ul className='kanto no-bullets' {...droppableProps} ref={innerRef}>
            {dex.kanto.map((poke, i) => (
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
      <Droppable droppableId='sinnoh'>
        {({ droppableProps, innerRef, placeholder }) => (
          <ul className='sinnoh no-bullets' {...droppableProps} ref={innerRef}>
            {dex.sinnoh.map((poke, i) => (
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
