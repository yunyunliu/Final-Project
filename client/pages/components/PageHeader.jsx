import React from 'react';

import { Link } from 'react-router-dom';

const PageHeader = () => (
 <header>
   <div className='justify-center banner'>
      <div className='justify-center'>
        <img style={{ height: 80, width: 80 }} src='/images/Trello.png' alt="logo"/>
        <div style={{ fontWeight: 700, marginLeft: 20 }}>
          <h1 className="no-margin gray-text">Kanban</h1>
          <h2 className='pink-text no-margin'>Visualize and organize</h2>
        </div>
      </div>
   </div>
    <nav className='top-nav no-padding'>
        <ul className='top-list no-padding'>
          <li className="nav-item">
            <Link className='gray-text semi-bold' to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className='gray-text semi-bold' to="/logout">Log Out</Link>
          </li>
        </ul>
      </nav>
 </header>
);

export default PageHeader;
