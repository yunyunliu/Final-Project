import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = () => (
 <div className='page-header row '>
   <div className='column-full teal-bg justify-center'>
      <div className='brand flex'>
        <img className='logo' src='./images/Trello.png' alt="logo"/>
        <div className='header-text semi-bold'>
          <h1 className="no-margin">Kanban</h1>
          <h2 className='pink-text no-margin'>Visualize and organize</h2>
        </div>
      </div>
   </div>
    <nav className='top-nav width-100 container no-padding'>
        <ul className='top-list no-padding'>
          <li className="nav-item">
            <Link className='gray-text' to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className='gray-text' to="/logout">Log Out</Link>
          </li>
        </ul>
      </nav>
 </div>
);

export default PageHeader;
