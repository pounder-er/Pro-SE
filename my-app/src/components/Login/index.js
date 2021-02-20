import React from 'react';

import logo from './dogecoin.png';

import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

import styled from 'styled-components';

import fire_base from '../../firebase/Firebase';

import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    onClickLogin=async()=>{
        console.log(this.state.email);
        console.log(this.state.password);
        await fire_base.login(this.state.email,this.state.password,this.loginSuccess,this.loginUnsuccess);
    }

    loginSuccess=(data)=>{
        console.log("success");
        this.props.history.push("/Home");
    }

    loginUnsuccess=(error)=>{
        console.error(error);
    }

    render() {
        return (
            <Container>
                <Body>
                    <Image src={logo} alt="Dogecoin" />
                    <InputGroup style={{ marginTop: 15 }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><BsFillPersonFill /></InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Username" type="email" value={this.state.email} onChange={e => this.setState({email:e.target.value})} />
                    </InputGroup>

                    <InputGroup style={{ marginTop: 12 }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText><BsFillLockFill /></InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Password" type="password" value={this.state.password} onChange={e => this.setState({password:e.target.value})} />
                    </InputGroup>
                    <Button style={{ marginTop: 15 }} color="primary" onClick={this.onClickLogin}>Login</Button>
                </Body>
            </Container>
        );
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1F1F1F;
    height: 100vh;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1F1F1F;
    width: 40vw;
    max-width: 100mm  
`;

const Image = styled.img`
    height: 25vh;
    display: flex;
    align-self: center;
    object-fit: contain;
 `;


export default Login;