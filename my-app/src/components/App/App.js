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
import { addSession, addUserProfile } from '../../redux/actions';


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
              // console.log("test")
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

  async componentDidMount(){
    await fire_base.getStateChangedUser(this.getSuccess, this.getUnsuccess);
  }

  getSuccess = async(user) => {
    await this.props.dispatch(addSession(user));
    await console.log(this.props.session);
    await fire_base.getUserProfile(this.props.session.uid,this.getUserProfileSuccess,this.getUserProfileUnSuccess);
  }

  getUserProfileSuccess=(data)=>{
    data.email = this.props.session.email
    this.props.dispatch(addUserProfile(data));
    this.props.history.push("/home");
  }

  getUserProfileUnSuccess(error){
    console.error(error);
  }

  getUnsuccess = () => {
    this.props.history.push("/login");
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
