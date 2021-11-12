import React, { useState } from 'react';

const SubMenu = ({ setMenu, setTags, tags }) => {
  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  // const [tagsCreated, setTagsCreated] = useState([]);

  const handleAddTag = async (text, color) => {
    console.log('color @ handleAddTag:', color)
    const options = {
      method: 'POST',
      body: JSON.stringify({ text, color }),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch('/api/users/1/boards/1/col/1/cards/1/tags', options);
    if (response.ok) {
      const data = await response.json();
      console.log('response to post:', data)
      setTags(tags.concat(data));
      setText('');
      // setTagsCreated(tagsCreated.concat(data));
    }
  };

  return (
    <div>
      <div className='sub-menu blue-bg flex flex-col'>
        <div className='menu-header semi-bold'>
          <button className='icon-btn header-btn' type='button' onClick={() => setMenu(false)}><i className="fas fa-arrow-left"></i></button>
          <h3 className='no-margin'>Create Tag</h3>
          <button type='button' onClick={() => setMenu(false)} className='icon-btn header-btn'><i className="fas fa-times"></i></button>
        </div>
        <div>
          <label htmlFor='color-input'>Tag Color</label>
          <input type='color'
            value={color}
            onChange={e => setColor(e.target.value)} />
          <ul className='no-bullets no-padding'>
            {tags.length > 0
              ? tags.map(tag => (
                <li key={tag.tagId}>
                  <div className='expanded-tags'
                    style={{ backgroundColor: tag.color }}>
                      {tag.text}
                  </div>
                </li>
              ))
              : null
            }
          </ul>
        </div>
        <div><label className='tag-input-label' htmlFor='tag-name-input'> Tag Name</label></div>
        <div className='flex width-100'>
          <input value={text}
              id='tag-text-input'
              className='tag-text-input'
              onChange={e => setText(e.target.value)} />
          <button type='button'
            onClick={() => {
              console.log(color)
              handleAddTag(text, color);
            }}
            className='form-btn add-tag-btn'>Add
          </button>
        </div>
        <button type='button'
          onClick={() => {
            setMenu(false);
          }}>done
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
