import React, { useState } from 'react';

const SubMenu = ({ setMenu, setTags, tags }) => {
  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  // const [tagsCreated, setTagsCreated] = useState([]);

  const handleAddTag = async (text, color) => {
    // console.log('color @ handleAddTag:', color)
    const options = {
      method: 'POST',
      body: JSON.stringify({ text, color }),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch('/api/users/1/boards/1/col/1/cards/1/tags', options);
    if (response.ok) {
      const data = await response.json();
      // console.log('response to post:', data)
      setTags(tags.concat(data));
      setText('');
      // setTagsCreated(tagsCreated.concat(data));
    }
  };

  return (
    <div>
      <div className='sub-menu'>
        <div className='menu-header semi-bold'>
          <button className='icon-btn header-btn' type='button' onClick={() => setMenu(false)}><i className="fas fa-arrow-left"></i></button>
          <h3 style={{ fontSize: 20, marginLeft: 40 }} className='no-margin'>Create Tag</h3>
          {/* <button type='button' onClick={() => setMenu(false)} className='icon-btn header-btn'><i className="fas fa-times"></i></button> */}
        </div>
        <div className='flex width-100'>
          <label htmlFor='color-input' style={{ marginRight: 15, fontSize: 18 }} className='semi-bold'>Color</label>
          <input type='color'
            value={color}
            className='teal-border-2'
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
        <div className='flex width-100 tag-text-section'>
          <label style={{ marginRight: 15, fontSize: 18 }} className='semi-bold' htmlFor='tag-name-input'>Text</label>
          <input value={text}
              id='tag-text-input'
              className='tag-text-input'
              onChange={e => setText(e.target.value)} />
          <button type='button'
            onClick={() => {
              // console.log(color)
              handleAddTag(text, color);
            }}
            className='form-btn add-tag-btn'>Add
          </button>
        </div>
        <button type='button'
          className='form-btn'
          onClick={() => {
            setMenu(false);
          }}>done
        </button>
      </div>
    </div>
  );
};

export default SubMenu;
