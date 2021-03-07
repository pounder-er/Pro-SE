import logo from './logo.svg';
import React from 'react';



import { Switch, Route, Link, NavLink } from 'react-router-dom';
import {
  BsFillPersonFill,
  BsFillLockFill,
  BsFillGrid1X2Fill,
  BsFillArchiveFill,
  BsBriefcaseFill
} from "react-icons/bs";
import { CgSidebarOpen, CgSidebar } from "react-icons/cg";
import fire_base from '../../firebase/Firebase';

import Login from '../Login/Login'
import Home from '../Home/Home'

import { connect } from 'react-redux';
import { addSession } from '../../redux/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    fire_base.getStateChangedUser(this.getSuccess, this.getUnsuccess);
  }

  getSuccess = (user) => {
    this.props.dispatch(addSession(user));
    console.log(this.props.session);
  }

  getUnsuccess = () => {

  }


  componentDidMount(){
    console.log(this.props.session);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        {this.props.session&&<Route path="/home" component={Home} />}
        <Route component={Login} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
  }
}

export default connect(mapStateToProps)(App);
