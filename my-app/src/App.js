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
import HistoryInOut from './HistoryInOut'
import ProductInspection from './ProductInspection'
import EditCompany from './EditCompany'
import EditBranch from './EditBranch'
import DailyStock from './DailyStock'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
}

  render(){
    return (


      //<Login/>
      //<Contact/>
      //<Company/>
      //<CompanyDetail/>
      //<EditCompany/>
      //<AddCompany/>
      //<Branch/>
      //<BranchDetail/>
      // <EditBranch/>
      //<HistoryInOut/>
      //<ProductInspection/>
      <DailyStock/>
     
    );
  }
}
export default App;
