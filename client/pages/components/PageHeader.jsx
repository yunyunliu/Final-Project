import React from 'react';

import { Link } from 'react-router-dom';

const PageHeader = () => (
 <div className='page-header row width-100'>
   <div className='column-full teal-bg justify-center banner'>
      <div className='brand flex'>
        <img className='logo' src='./images/Trello.png' alt="logo"/>
        <div className='header-text semi-bold'>
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
 </div>
);

export default PageHeader;
