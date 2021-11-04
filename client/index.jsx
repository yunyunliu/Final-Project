import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const test = [
  {
    id: 1,
    name: 'typescript project'
  }, {
    id: 2,
    name: 'ajax project'
  },
  {
    id: 3,
    name: 'secret project'
  }
];

ReactDOM.render(
  <App data={test} />,
  document.querySelector('#root')
);
