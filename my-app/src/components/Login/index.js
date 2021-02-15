import React from 'react';

import logo from './dogecoin.png';

import { Button, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

import styled from 'styled-components';

class Login extends React.Component {
    constructor(props) {
        super(props);

    }

    onClickLogin(){
        window.location.href="/Home"
    }

    render() {

        const Container = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f10f0f;
            height: 100vh;
        `;

        const Body = styled.div`
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #291268;
       
        `;

        const Image = styled.img`
            height: 30vh;
            width: auto;
            display: flex;
            justify-content: center;
        `;


        return (
            <Container>
                <Body>
                    <Image src={logo} alt="Dogecoin" />
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
                    <Button style={{ marginTop: 15 }} onClick={this.onClickLogin} color="primary">Login</Button>
                </Body>
            </Container>
        );
    }
}


export default Login;