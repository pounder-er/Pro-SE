import React from 'react';
import './Login.css';

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
    PaginationLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";


class Manager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Container">
                <header className="Header">
                    <p>head</p>
                </header>
                <div className="Content">
                    <div className="Sidebar">
                        <ProSidebar>
                            <Menu iconShape="square">
                                <MenuItem >Dashboard</MenuItem>
                                <MenuItem >จัดการสินค้า</MenuItem>
                                <MenuItem >ตรวจสอบสินค้า</MenuItem>
                                <MenuItem >ประวัติสินค้าเข้า/ออกคลัง</MenuItem>
                                <MenuItem >ผู้ติดต่อ</MenuItem>
                                <MenuItem >จัดการพนักงาน</MenuItem>
                                <MenuItem >เช็ค Stock สินค้า</MenuItem>
                                <MenuItem >จัดการพนักงาน</MenuItem>
                                <MenuItem >ตั้งเวลาเช็คStockสินค้าประจำวัน</MenuItem>
                                <MenuItem >ยอดขายสินค้า</MenuItem>
                                <MenuItem >คำนวนปริมาณการสั่งซื่อสินค้า</MenuItem>
                                {/* <SubMenu title="Components" >
                                    <MenuItem>Component 1</MenuItem>
                                    <MenuItem>Component 2</MenuItem>
                                </SubMenu> */}
                            </Menu>
                        </ProSidebar>
                    </div>
                    <body className="Body">
                        <h3 style={{marginLeft:25, marginTop:20}}>ตรวจสอบบริษัท</h3>
                        <Table hover style={{width:'95%', alignSelf:'center', marginTop:20}}>
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
                        <Pagination aria-label="Page navigation example" 
                                    style={{justifyContent:'center',
                                            marginTop:10}}>
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