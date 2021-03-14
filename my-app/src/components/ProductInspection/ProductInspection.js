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
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdCallReceived,MdLens, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";



class HistoryInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className="Container">
                <header className="Header">
                    <div className="Icon">
                        <img src="/dogecoin.png" width="55px" />
                    </div>
                    <div className="Profile">
                        <div className="tab">
                            <b>ประยา จันโอชุท</b>
                            <b className="tabLeft">ID: M44114</b>
                        </div>
                        <b className="rank">Manager</b>
                    </div>
                    <Button color="danger" style={{ borderRadius: 0 }}>ออกจากระบบ</Button>

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
                        <h1 style={{
                            marginTop: 20,
                            marginBottom: 20,
                            width: '95%',
                            alignSelf: 'center'
                        }}>รายการสินค้า</h1>
                        <div className="Search_Button">
                            <InputGroup style={{ width: 400 }}>
                                <Input placeholder="รหัสสินค้า" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><MdSearch color="#1F1F1F" size={22} /></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Button color="info" style={{ width: 100 }}>fillter</Button>
                        </div>

                        <Table striped style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>รหัสสินค้า</th>
                                    <th>รายการสินค้า</th>
                                    <th>ชนิด</th>
                                    <th>น้ำหนัก</th>
                                    <th>เก่า/ใหม่</th>
                                    <th>ราคาต่อหน่วย</th>
                                    <th>สถานะ</th>
                                    <th>ยอดคงเหลือ</th>
                                    <th>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>110100</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>
                                    <td>ข้าวหอมมะลิ</td>
                                    <td>5</td>
                                    <td>ใหม่</td>
                                    <td>250</td>
                                    <td><MdLens color="#00B046" size={20}/>ปกติ</td>
                                    <td>500</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>100100</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>
                                    <td>ข้าวหอมมะลิ</td>
                                    <td>5</td>
                                    <td>ก่า</td>
                                    <td>250</td>
                                    <td><MdLens color="#000000" size={20}/>ยกเลิกจำหน่าย</td>
                                    <td>2</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>110200</td>
                                    <td>ข้าวหอมมะลิ ตรานานา</td>
                                    <td>ข้าวหอมมะลิ</td>
                                    <td>5</td>
                                    <td>ใหม่</td>
                                    <td>100</td>
                                    <td><MdLens color="#ffff00" size={20}/>ใกล้หมด</td>
                                    <td>30</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>



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


export default HistoryInOut;