import React, { useState, useEffect } from 'react';

// const colorList = ['green', 'light-blue', 'gray', 'blue', 'pink', 'purple', 'orange', 'yellow', 'red', 'none'];

const SubMenu = ({ setTags, tags, board }) => {
  const [tagColor, setTagColor] = useState('green');
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState([]);
  // const [tagsCreated, setTagsCreated] = useState([]);

  useEffect(() => {
    fetch('/api/tags/1')
      .then(response => response.json())
      .then(tags => setOptions(tags))
      .catch(err => console.error(err.message));
  }, []);

  const handleSelect = async tagId => {
    const check = tags.find(tag => tag.tagId == tagId);
    if (!check) {
      const tag = options.find(opt => opt.tagId == tagId);
      setTags(tags.concat(tag));
    }
  };

  return (
      <div className='sub-menu'>
          <div className=''>
            {/* <div style={{ fontSize: 16, fontWeight: 600, width: '100%' }}>Tag Color</div> */}
            <ul className='color-list'>
              {options.map(opt => (
                <li key={opt.tagId}
                  style={{ margin: '5 2' }}>
                  <button type='button'
                    onClick={() => handleSelect(opt.tagId)}
                    className={`color-btn ${opt.color}`}>{opt.text}
                    <span>{tagColor === opt.color ? <i className='fas fa-check'></i> : null}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className='tag-text-section'>
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
          </div> */}
      </div>
  );
};

export default SubMenu;
