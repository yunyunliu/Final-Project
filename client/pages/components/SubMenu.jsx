import React, { useState } from 'react';

const SubMenu = ({ setMenu, setTags, tags }) => {
  const [selected, setSelected] = useState('purple');
  const [text, setText] = useState('');

  const labelColors = [
    { color: 'purple' },
    { color: 'yellow' },
    { color: 'blue' },
    { color: 'red' },
    { color: 'orange' },
    { color: 'green' }
  ];

  const check = (
    <i className="fas fa-check"></i>
  );

  const handleAddTag = async (text, color) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ text, color }),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch('/api/users/1/boards/1/col/1/cards/1/tags', options);
    if (response.ok) {
      const data = await response.json();
      setTags(tags.concat(data));
    }
  };

  return (
    <div className='sub-menu blue-bg flex flex-col'>
      <div className='menu-header semi-bold'>
        <button className='icon-btn header-btn' type='button' onClick={() => setMenu(false)}><i className="fas fa-arrow-left"></i></button>
        <h3 className='no-margin'>Create Tag</h3>
        <button type='button' onClick={() => setMenu(false)} className='icon-btn header-btn'><i className="fas fa-times"></i></button>
      </div>

      <ul className='no-bullets no-padding color-list'>
        {labelColors.map((color, i) => (
          <li className={`label-item width-100  ${color.color}`} key={i}>
            <button className={`${color.color} color-btn no-border`}
              type='button'
              id={color.color}
              onClick={e => setSelected(e.target.id)}>
              {selected === color.color ? check : null}
            </button>
          </li>
        ))}
      </ul>
      <div><label className='tag-input-label' htmlFor='tag-name-input'> Tag Name</label></div>
      <div className='flex width-100'>
        <input value={text}
            id='tag-text-input'
            className='tag-text-input'
            onChange={e => setText(e.target.value)} />
        <button type='button'
          onClick={() => handleAddTag(text, selected)}
          className='form-btn add-tag-btn'>Add</button>
      </div>
      <button type='button'
        onClick={() => {
          setMenu(false);
        }}>done</button>
    </div>
  );
};

export default SubMenu;
