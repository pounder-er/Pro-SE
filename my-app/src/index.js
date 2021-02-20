import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/index';
import Login from './components/Login/index';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-pro-sidebar/dist/css/styles.css';

import { BrowserRouter, Switch, Route} from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Home" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
