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
import { MdSearch, MdDescription, MdCallReceived, MdCallMade } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";



class Sell extends React.Component {
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
                        }}>รายการขายสินค้า</h1>
                        <div className="Search_Button">
                            <InputGroup style={{ width: 400 }}>
                                <Input placeholder="หมายเลขใบสั่งซื้อ" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><MdSearch color="#1F1F1F" size={22} /></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Button color="info" style={{ width: 100 }}>fillter</Button>
                            <Button color="info" style={{ width: 180 }}>เพิ่มรายการขายสินค้า</Button>
                        </div>

                        <Table striped style={{ width: '95%', alignSelf: 'center', marginTop: 20 }}>
                            <thead>
                                <tr>
                                    <th>ลำดับที่</th>
                                    <th>สาขา</th>
                                    <th>หมายเลขใบแจ้งหนี้</th>
                                    <th>วันที่สร้างใบขาย</th>
                                    <th>วันที่สำเร็จการขาย</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>สถานะ</th>
                                    <th>รายละเอียด</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>หน้ามอเกษตร ศรีราชา</td>
                                    <td>100012</td>
                                    <td>01/01/2564</td>
                                    <td>-</td>
                                    <td>ประยา จันชุด</td>
                                    <td>รอนำของออกคลัง</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>cental ระยอง</td>
                                    <td>100013</td>
                                    <td>01/01/2564</td>
                                    <td>-</td>
                                    <td>ประยา จันชุด</td>
                                    <td>กำลังจัดส่ง</td>
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


export default Sell;