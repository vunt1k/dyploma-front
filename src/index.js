import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App.jsx';

import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);