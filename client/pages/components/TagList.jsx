import React from 'react';

const TagList = ({ tags, remove }) => (
  <div>
    <span className='semi-bold' style={{ marginRight: 10, alignSelf: 'flex-start' }}>Tags:</span>
    <ul className='no-bullets no-padding'>
    {tags.map(tag => (
      <li key={tag.tagId}
        style={{ display: 'inline-block' }}
        className={`${tag.color} card-label tooltip`}>
        <span className='tooltiptext'>{tag.text}
          <button type='button'
            className='remove-tag-btn'
            onClick={() => remove(tag.tagId)}>
            <i className='fas fa-times tooltip-icon'></i>
          </button>
        </span>
      </li>))}
    </ul>
  </div>
);

export default TagList;
