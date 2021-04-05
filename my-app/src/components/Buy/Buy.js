import React from 'react';


import './Company.css';

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
    Switch, 
    Route, 
    Link, 
    NavLink, 
    withRouter } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";



class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Container">

                <div className="Content">
                    <body className="Body">
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '95%',
                            alignSelf: 'center'
                        }}>รายการสั่งซื้อสินค้า</h1>
                        <div className="Search_Button">
                            <InputGroup style={{ width: 400 }}>
                                <Input placeholder="หมายเลขใบสั่งซื้อ" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><MdSearch color="#1F1F1F" size={22} /></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Button color="info" style={{ width: 100 }}>fillter</Button>
                            <Link to={this.props.match.url+"/po"}>
                            <Button color="info" style={{ width: 150 }}>เพิ่มรายการสั่งซื้อ</Button>
                            </Link>
                        </div>

                        <Table striped style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>ลำดับที่</th>
                                    <th>บริษัท</th>
                                    <th>หมายเลขใบสั่งซื้อ</th>
                                    <th>วันที่สั่งซื้อ</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>สถานะ</th>
                                    <th>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>สส.จำกัด</td>
                                    <td>100012</td>
                                    <td>01/01/2564</td>
                                    <td>ประยา จันชุด</td>
                                    <td>รอใบเสนอขาย</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>สส.จำกัดค้าแป้ง</td>
                                    <td>100013</td>
                                    <td>01/01/2564</td>
                                    <td>ประยา จันชุด</td>
                                    <td>รอการยืนยัน</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                {/* <tr>
                                    <th scope="row">3</th>
                                    <td>100012</td>
                                    <td>01/01/2564</td>
                                    <td>ประยา จันชุด</td>
                                    <td>เข้า</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr> */}



                            </tbody>
                        </Table>
                        <Pagination aria-label="Page navigation example"
                            style={{
                                justifyContent: 'center',
                                marginTop: 10
                            }}>
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


export default Buy;