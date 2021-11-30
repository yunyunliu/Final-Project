import React, { useState, useEffect } from 'react';

const SubMenu = ({ setTags, tags, board }) => {
  const [tagColor, setTagColor] = useState('yellow');
  // const [selected, setSelected] = useState('');
  const [options, setOptions] = useState([]);

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
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {options.map(opt => (
                <li key={opt.tagId}
                  style={{ margin: '5 2' }}>
                  <button type='button'
                    onClick={() => {
                      setTagColor(opt.color);
                      handleSelect(opt.tagId);
                    }}
                    className={`color-btn ${opt.color}`}>{opt.text}
                    <span>{tagColor === opt.color
                      ? <i className='fas fa-check' style={{ margin: 2 }}></i>
                      : null}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
      </div>
  );
};

export default SubMenu;
