import React, { useState } from 'react';

const SubMenu = ({ data }) => {
  const [purple, setPurple] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [blue, setBlue] = useState(false);
  const [red, setRed] = useState(false);
  const [orange, setOrange] = useState(false);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState('');
  const check = (
    <i className="fas fa-check"></i>
  );

  return (
    <div className='sub-menu blue-bg'>
      <div className='menu-header semi-bold'>
        <button className='icon-btn'><i className="fas fa-arrow-left"></i></button>
        Create Tag
        <button className='icon-btn'><i className="fas fa-times"></i></button>
      </div>
      <form className='flex flex-col add-tag-form'>
        <input className='tag-text-input' placeholder='tag name' onChange={e => setName(e.target.value) }/>
        <h3>tag color</h3>
        <div className='flex color-row-top'>
          <button className='color-label purple' id='purple' type='button' onClick={() => setPurple(!purple)}>{purple ? check : null}</button>
          <button className='color-label yellow' id='yellow' type='button' onClick={() => setYellow(!yellow)}>{yellow ? check : null}</button>
          <button className='color-label blue' id='blue' type='button' onClick={() => setBlue(!blue)}>{blue ? check : null}</button>
        </div>
        <div className='flex color-row-bot'>
          <button className='color-label red' id='red' type='button' onClick={() => setRed(!red)}>{red ? check : null}</button>
          <button className='color-label orange' id='orange' type='button' onClick={() => setOrange(!orange)}>{orange ? check : null}</button>
          <button className='color-label' id='other' type='button'>Other</button>
      </div>
      <button>Add Tag</button>
      </form>
    </div>
  );
};

export default SubMenu;
