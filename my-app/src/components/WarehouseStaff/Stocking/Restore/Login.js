import React from 'react';
import './Login.css';

import logo from './dogecoin.png';

import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Container">
                 <body className="Login">
                    <div className="Image">
                        <img className="Logo" src={logo} alt="Dogecoin" />
                    </div>

                    <InputGroup style={{ marginTop: 15 }}>
                        <InputGroupAddon addonType="prepend">

                            <InputGroupText><BsFillPersonFill /></InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="username" />
                    </InputGroup>

                    <InputGroup style={{ marginTop: 12 }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><BsFillLockFill /></InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" />
                    </InputGroup>

                    <Button style={{ marginTop: 15 }} color="primary">Login</Button>
                </body> 
            </div>
        );
    }
}


export default Login;