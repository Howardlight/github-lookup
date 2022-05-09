import React from 'react';
import * as ReactDOM from "react-dom/client";
import './index.css';
import {ToggleColorMode as App} from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();