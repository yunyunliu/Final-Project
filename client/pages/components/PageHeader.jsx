import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = () => (
 <div>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/boards/id">board1</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
          </nav>
 </div>
);

export default PageHeader;
