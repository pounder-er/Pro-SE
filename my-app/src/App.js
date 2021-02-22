import logo from './logo.svg';
import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import Login from './Login';
import Manager from './Manager';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0
    }
  }

  setCount =()=> {
    this.setState({count:this.state.count+1})
  }

  render(){
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick = {this.setCount.bind(this)}>click</button>
      </div>

      // <Login/>
      // <Manager/>
     
    );
  }
}
export default App;
