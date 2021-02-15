import logo from './logo.svg';
import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import Login from './Login';
import Company from './Company';
import CompanyDetail from './CompanyDetail'
import Branch from './Branch';
import HistoryInOut from './HistoryInOut'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
}

  render(){
    return (


      //<Login/>
      //<Company/>
      //<CompanyDetail/>
      //<Branch/>
      <HistoryInOut/>

      
        // <header className="App-header">
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <p>
        //     44kl4 <code>src/App.js</code> and save to reload.
           
        //   </p>
        //   <a
        //     className="App-link"
        //     href="https://reactjs.org"
        //     target="_blank"
        //     rel="noopener noreferrer"
        //   >
        //     Learn React
        //   </a>
        // </header>
     
    );
  }
}
export default App;
