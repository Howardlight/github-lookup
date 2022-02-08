import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToggleColorMode from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();