import logo from './logo.svg';
import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import Login from './Login';
import Company from './Company';
import CompanyDetail from './CompanyDetail'
import AddCompany from './AddCompany'
import Branch from './Branch';
import BranchDetail from './BranchDetail';
import Contact  from './Contact'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
}

  render(){
    return (


      //<Login/>
      <Contact/>
      //<Company/>
      //<CompanyDetail/>
      //<AddCompany/>
      //<Branch/>
      //<BranchDetail/>
      
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
