import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme';
import './index.css';
import App from './App';
import uuid from 'uuid';

if (!localStorage.getItem('gopad:theme')) {
  localStorage.setItem('gopad:theme', JSON.stringify(theme));
}
if (!localStorage.getItem('gopad:user')) {
  localStorage.setItem('gopad:user', uuid.v4());
}
if (!localStorage.getItem('gopad:links')) {
  localStorage.setItem('gopad:links', '[]');
}
if (!localStorage.getItem('gopad:notes')) {
  localStorage.setItem('gopad:notes', '[]');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
