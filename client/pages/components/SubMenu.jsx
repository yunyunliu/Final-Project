import React, { useState } from 'react';

const colorList = ['green', 'light-blue', 'gray', 'blue', 'pink', 'purple', 'orange', 'yellow', 'red', 'none'];

const SubMenu = ({ setMenu, setTags, tags, board }) => {
  const [tagColor, setTagColor] = useState('green');
  const [text, setText] = useState('');
  // const [tagsCreated, setTagsCreated] = useState([]);

  const handleAddTag = async (text, color) => {
    // console.log(board)
    if (color) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ text, color, boardId: board }),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch('/api/tags', options);
      if (response.ok) {
        const data = await response.json();
        setTags(tags.concat(data));
        setText('');
      }
    }
  };

  return (
      <div className='sub-menu'>
          <div className=''>
            <div style={{ fontSize: 16, fontWeight: 600, width: '100%' }}>Tag Color</div>
            <ul className='color-list'>
              {colorList.map((color, i) => (
                <li key={i}>
                  <button type='button'
                    onClick={() => setTagColor(color)}
                    className={`color-btn ${color}`}>{tagColor === color ? <i className='fas fa-check'></i> : null}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className='tag-text-section'>
            <input value={text}
                id='tag-text-input'
                className='tag-text-input'
                onChange={e => setText(e.target.value)} />
            <button type='button'
              onClick={() => {
                handleAddTag(text, tagColor);
              }}
              className='form-btn add-tag-btn'>Add
            </button>
          </div>
      </div>
  );
};

export default SubMenu;
