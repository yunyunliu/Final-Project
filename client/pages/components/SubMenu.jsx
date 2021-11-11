import React from 'react';

const SubMenu = ({ data }) => {
  return (
    <div className='sub-menu blue'>
      <ul className='no-bullets'>
        {
          data.map(tag => <li className={tag.color} key={tag.tagId}>{tag.text}</li>)
        }

      </ul>
    </div>
  );
};

export default SubMenu;
