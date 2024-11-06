import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * There is possibility that no root element might be present on each website. So let's create our own root element if it doesn't exist.
 */

let createRootElement = document.getElementById('jobly');
if (!createRootElement) {
  createRootElement = document.createElement('div');
  createRootElement.id = 'jobly';
  document.body.appendChild(createRootElement);
}

const root = ReactDOM.createRoot(createRootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);