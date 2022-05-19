import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Calculator from './Calculator';

const root = ReactDOM.createRoot(document.getElementById('calculator'));
root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);