import React, { useState } from 'react';

const SubMenu = ({ data }) => {
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const check = (
    <i className="fas fa-check"></i>
  );

  return (
    <div className='sub-menu blue-bg'>
      <form className='flex flex-col'>
        <h1>Create Tag</h1>
        <input placeholder='tag name' />
        <h3>tag color</h3>
        <div className='flex color-row-top'>
          <button className='color-label purple' id='purple' type='button'></button>
          <button className='color-label yellow' id='yellow' type='button'></button>
          <button className='color-label blue' id='blue' type='button'></button>
        </div>
        <div className='flex color-row-top'>
          <button className='color-label red' id='red' type='button'></button>
          <button className='color-label orange' id='orange' type='button'></button>
          <button className='color-label' id='other' type='button'></button>
      </div>
      </form>
    </div>
  );
};

export default SubMenu;
