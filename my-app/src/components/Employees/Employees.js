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
} from 'reactstrap';

import styled from 'styled-components';

import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";

class Employees extends Component {

    render() {
        return (
            <Container>
                <h3>จัดการพนักงาน</h3>
                <Table striped >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>เบอร์ติดต่อ</th>
                                    <th>ตำแหน่ง</th>
                                    <th>สถานะ</th>
                                    <th>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>ประยา</td>
                                    <td>จันโอชุท</td>
                                    <td>083-889456-2</td>
                                    <td>ผู้จัดการ</td>
                                    <td>ปกติ</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Container>
        );
    }
}

const Container = styled.div`
      display: flex;
      align-items: flex-start;
      background-color: white; 
      flex-direction:column;
    `;

export default Employees;