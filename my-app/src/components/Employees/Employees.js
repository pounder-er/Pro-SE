import React, { Component } from 'react';

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    Label,
    Row,
    Col,
    Container,
    UncontrolledCollapse,
    CardBody,
    Card
} from 'reactstrap';

import styled from 'styled-components';

import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";

import FormEmployee from './FormEmployee';

class Employees extends Component {

    render() {
        return (
            <Container style={{ backgroundColor: 'white' }}>
                <h3>จัดการพนักงาน</h3>
                <Row>
                    <Col lg="6" md="6">.col-3</Col>
                    <Col lg="6" md="6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                            เพิ่มพนักงาน
                        </Button>
                    </Col>


                </Row>
                <UncontrolledCollapse toggler="#toggler">
                    <FormEmployee />
                </UncontrolledCollapse>
            </Container>
        );
    }
}

// const Container = styled.div`
//       display: flex;
//       align-items: flex-start;
//       background-color: white; 
//       flex-direction:column;
//     `;

export default Employees;