import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App as Frontend} from './app-frontend/app';
import {App as Admin} from './app-admin/app';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "tailwindcss/dist/utilities.min.css";
import {StoreFactory} from "./store/store.factory";
import {Provider} from "react-redux";
require('./typings.d.ts');

const store = StoreFactory.createStore();

ReactDOM.render(
    <Provider store={store}>
      {process.env.REACT_APP_TYPE === 'frontend' ? <Frontend/> : <Admin />}
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
