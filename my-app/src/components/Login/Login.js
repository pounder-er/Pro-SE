import React from 'react';
import logo from './dogecoin.png';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Form,
    FormGroup,
    Label,
    FormText,
    FormFeedback,
    Col, Row,
    Spinner,
    Alert
} from 'reactstrap';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";

import styled from 'styled-components';

import fire_base from '../../firebase/Firebase';

import { connect } from 'react-redux';

import { addSession } from '../../redux/actions';

import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ivalid email').required('This field is requred'),
    password: Yup.string().required('This field is requred')
})
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            spinner:false
        }
        fire_base.getStateChangedUser(this.getSuccess, this.getUnsuccess);
    }

    getSuccess = (user) => {
        this.props.dispatch(addSession(user));
        this.props.history.push("/home");
    }

    getUnsuccess = () => {
        
    }

    onClickLogin = async (values) => {
        this.setState({spinner:true});
        await fire_base.login(values.email, values.password, this.loginSuccess, this.loginUnsuccess);
    }

    loginSuccess = async(res) => {
        this.props.dispatch(addSession(res.user));
        console.log(this.props.session);
        this.setState({spinner:false});
        this.props.history.push("/home");
    }

    loginUnsuccess = (error) => {
        console.error(error);
        this.setState({spinner:false});
        alert(error.message);
    }

    render() {
        return (
            <Container>
                <Body>
                    <Image src={logo} alt="Dogecoin" />
                    <Formik
                        validationSchema={LoginSchema}
                        onSubmit={values => this.onClickLogin(values)}
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
                        }) => (
                            <Form onSubmit={handleSubmit} style={{ marginTop: 15 }}>
                                <Row>
                                <FormGroup style={{flex:1}}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><BsFillPersonFill /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="email" type="email" name="email" 
                                        value={values.email} 
                                        onChange={handleChange}
                                        invalid={errors.email && touched.email}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                </Row>
                                <Row>
                                <FormGroup style={{flex:1}}>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText><BsFillLockFill /></InputGroupText>
                                        </InputGroupAddon>
                                        <Input placeholder="password" type="password" name="password" 
                                        value={values.password} 
                                        onChange={handleChange}
                                        invalid={errors.password && touched.password}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                </Row>
                                <Row>
                                <Button type="submit" color="primary" style={{flex:1}}>Login</Button>
                                </Row>
                                
                            </Form>
                        )}

                    </Formik>
                    <div style={{height:40,marginTop:15,justifyContent:'center',alignItems:'center',display:'flex'}}>
                    {this.state.spinner&&<Spinner color="info" />}
                    </div>
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

export default connect()(Login);