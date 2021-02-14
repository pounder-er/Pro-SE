import React from 'react';
import './Manager.css';

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
    Alert
} from 'reactstrap';


import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';


import { BsFillPersonFill, BsFillLockFill, BsFillGrid1X2Fill, BsTextIndentRight } from "react-icons/bs";


class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 0
        }
    }

    onClickButton=()=> {
        this.setState({test:this.state.test+=1});
    }

    render() {
        return (
            <div className="Container">
                <ProSidebar>
                    <Menu iconShape="square">
                        <MenuItem icon={<BsFillGrid1X2Fill />}>Dashboard</MenuItem>
                        <SubMenu title="จัดการสินค้า" >
                            <MenuItem>รายการซื้อสินค้า</MenuItem>
                            <MenuItem>รายการขายสินค้า</MenuItem>
                            <MenuItem>เพิ่มสินค้าใหม่</MenuItem>
                        </SubMenu>
                        <MenuItem >ตรวจสอบสินค้า</MenuItem>
                        <MenuItem >ประวัติสินค้าเข้า/ออกคลัง</MenuItem>
                        <SubMenu title="ผู้ติดต่อ" >
                            <MenuItem>บริษัท</MenuItem>
                            <MenuItem>สาขา</MenuItem>
                        </SubMenu>
                        <MenuItem >จัดการพนักงาน</MenuItem>
                        <MenuItem >เช็ค Stock สินค้า</MenuItem>
                        <MenuItem >ตั้งเวลาเช็ค Stock ประจำวัน</MenuItem>
                        <MenuItem >ยอดขายสินค้า</MenuItem>
                        <MenuItem >คำนวนปริมาณการสั่งซื้อสินค้า</MenuItem>
                    </Menu>
                </ProSidebar>
                <div className="Content">
                    <header className="Header">
                        <Button color="secondary" onClick={this.onClickButton}><BsTextIndentRight /></Button>
                    </header>
                    <body className="Body">
                        <h3>Body</h3>
                        <h2>{this.state.test}</h2>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Pagination aria-label="Page navigation example">
                            <PaginationItem>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink previous href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" />
                            </PaginationItem>
                        </Pagination>
                    </body>
                </div>
            </div>
        );
    }
}


export default Manager;