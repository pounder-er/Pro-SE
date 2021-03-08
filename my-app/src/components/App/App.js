import logo from './logo.svg';
import React from 'react';

import { Switch, Route, Link, NavLink, Redirect } from 'react-router-dom';
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

import Employees from '../Employees/Employees';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    
    this.PrivateRoute=({ component: Component, ...rest })=> {
      return (
        <Route
          {...rest}
          render={props =>
            this.props.session ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }
    
  }

  getSuccess = (user) => {
    this.props.dispatch(addSession(user));
    console.log(this.props.session);
    this.props.history.push("/home");
  }

  getUnsuccess = () => {
    this.props.history.push("/login");
  }


  async componentDidMount(){
    await fire_base.getStateChangedUser(this.getSuccess, this.getUnsuccess);
    // if(this.props.session){
   
    //   this.props.history.push('/home');
  
    // }

    // console.log(this.props.session);

    
  }

  

  render() {
    
    return (
      <Switch>
        
        <this.PrivateRoute path="/home" component={Home} />
        <Route path="/login" component={Login} />
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
