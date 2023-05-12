import React from 'react';
import * as ReactDOM from "react-dom/client";
import './index.css';
import ToggleColorMode from "./App";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>
);