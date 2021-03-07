import logo from './logo.svg';
import './App.css';
import React from 'react';

import { Switch, Route, Link, NavLink } from 'react-router-dom';

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
import DashBoard from './DashBoard';

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
      //<DailyStock/>
      //<EditBranch/>
      //<HistoryInOut/>
      //<ProductInspection/>
      //<DashBoard/>
      <Switch>
        {/* <Route component={DashBoard} /> */}
        {/* <Route component={Company} /> */}
        <Route component={EditCompany} />
        {/* <Route component={Branch} /> */}
        {/* <Route component={EditBranch} /> */}
        {/* <Route component={Login} /> */}
      </Switch>

     
    );
  }
}
export default App;
