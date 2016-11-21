import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createDb from './lib/db'
import './index.css';

var db = createDb();
db.setLocation('London');

ReactDOM.render(
  <App db={db}/>,
  document.getElementById('root')
)
