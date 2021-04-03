import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
//routing
import { BrowserRouter, Switch, Route} from 'react-router-dom';
//create store


import './index.css';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
  <Route component={App} />
  </BrowserRouter>
  </Provider> 
  ,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
