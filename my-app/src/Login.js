import React from 'react';
import './Login.css';

import logo from './dogecoin.png';

import { Button,InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Login">
                <body className="Container">
                <div className="image">
                <img src={logo} alt="Girl in a jacket" width="180"  />
                </div>

                    <InputGroup style={{marginTop:10}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="username"  />
                    </InputGroup>

                    <InputGroup style={{marginTop:10}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password"/>
                    </InputGroup>
               
                    <Button style={{marginTop:10}} color="primary">Login</Button>
                </body>
            </div>
        );
    }
}


export default Login;