import React, { useState } from 'react';

const ProjectListItem = ({ board, handleToggle, handleEdit }) => {
  const { name, boardId } = board;
  const [projectName, setProjectName] = useState(name);
  const [displayEdit, setDisplayEdit] = useState(false);

  const handleChange = ({ target }) => {
    const text = target.value;
    setProjectName(text);
  };

  const editInput = (
    <>
      <div className='edit-element'>
        <input value={projectName}
        className='edit-input gray-text'
        onChange={e => handleChange(e)}
        />
        <button type='button'
        className='edit-btn icon-btn source-sans'
          id={boardId}
          onClick={e => {
            setDisplayEdit(false);
            handleEdit(e, projectName);
          }}>Done
        </button>
      </div>
      <button type='button'
      className='edit-btn icon-btn source-sans'
        onClick={() => {
          setDisplayEdit(false);
        }}>Cancel
      </button>
    </>
  );

  let timer = 0;
  let preventSingleClick = false;

  const handleSingleClick = () => {
    timer = setTimeout(() => {
      if (!preventSingleClick) {
        console.log('hello')
      }
      preventSingleClick = false;
    }, 200);
  };

  const handleDoubleClick = () => {
    clearTimeout(timer);
    preventSingleClick = true;
    setDisplayEdit(true);
  };
  const boardName = (
    <>
    {/* needs to respond to clicks and double clicks */}
      <button type='button'
        id={boardId}
        className='project-item blue-bg semi-bold no-padding'
        onDoubleClick={() => handleDoubleClick()}
        onClick={() => handleSingleClick()}>
        <p>{name}</p>
      </button>
      <button type='button'
        onClick={() => handleToggle(boardId)}
        className='icon-btn'>
        <i className='fas fa-times'></i>
      </button>
    </>
  );

  return (
    <li className='project-li'>
        {displayEdit ? editInput : boardName}
        {/* <Test /> */}
    </li>
  );
};

export default ProjectListItem;
