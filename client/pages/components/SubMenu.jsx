import React, { useState } from 'react';

const colorList = ['green', 'light-blue', 'gray', 'blue', 'pink', 'purple', 'orange', 'yellow', 'red', 'none'];

const SubMenu = ({ setMenu, setTags, tags }) => {
  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  // const [tagsCreated, setTagsCreated] = useState([]);

  const handleAddTag = async (text, color) => {
    // console.log('color @ handleAddTag:', color)
    if (color) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ text, color }),
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch('/api/tags', options);
      if (response.ok) {
        const data = await response.json();
        // console.log('response to post:', data)
        setTags(tags.concat(data));
        setText('');
        // setTagsCreated(tagsCreated.concat(data));
      }
    }
  };

  return (
    <div>
      <div className='sub-menu'>
        <div className='flex width-100'>
          <div>
            <label style={{ marginRight: 15, fontSize: 18 }} className='semi-bold' htmlFor='tag-name-input'>Text</label>
            <input value={text}
                id='tag-text-input'
                className='tag-text-input'
                onChange={e => setText(e.target.value)} />
            <button type='button'
              onClick={() => {
                handleAddTag(text, color);
              }}
              className='form-btn add-tag-btn'>Add
            </button>
          </div>
          <div>
            <ul className='no-bullets color-list'>
              {colorList.map((color, i) => (
                <li key={i}>
                  <button type='button' className={`color-btn ${color}`}></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='expanded-tag-container flex' style={{ marginTop: 15 }}>
            {tags.length > 0
              ? tags.map(tag => (
                <div key={tag.tagId}
                            className={`${tag.color} card-label tooltip`}
                            style={{ backgroundColor: tag.color }}>
                              <span className='tooltiptext'> {tag.text}
                                {/* <button type='button' className='remove-tag-btn' onClick={() => removeTag(tag.tagId)}><i className='fas fa-times tooltip-icon'></i></button> */}
                              </span>
                        </div>))
              : null}
          </div>
        <div className='flex width-100 tag-text-section'>

        </div>
      </div>
    </div>
  );
};

export default SubMenu;
