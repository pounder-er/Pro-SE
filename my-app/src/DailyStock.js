import React from 'react';


import './DailyStock.css';

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
import { MdSearch, MdDescription } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startStateBefore: new Date(),
            setStartStateBeofre: new Date(),
            startStateAfter: new Date(),
            setStartStateAfter: new Date()

        }
    }

    render() {
        return (
            <div className="Container">

                <header className="Header">
                    <div className="Profile">
                        <div className="tab">
                            <b>ประยา จันโอชุท</b>
                            <b className="tabLeft">ID: M44114</b>
                        </div>
                        <b className="rank">Manager</b>
                    </div>
                    <Button color="danger" style={{borderRadius:0}}>ออกจากระบบ</Button>
                    
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
                        <h1 style={{marginTop:20, 
                                    marginBottom:20, 
                                    width:'95%', 
                                    alignSelf:'center'}}>ตรวจสอบสินค้าประจำวัน</h1>
                        <div className="Date_Select">

                            {/* <InputGroup style={{width:400}}>
                                <Input placeholder="รหัสบริษัท/ชื่อบริษัท" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><MdSearch color="#1F1F1F" size={22}/></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Button color="success" style={{width:100}}>Filter</Button> */}

                            <p style={{paddingRight:10}}>ระหว่าง</p>
                            <DatePicker
                                placeholderText={this.state.setStartStateBeofre.toLocaleDateString()} 
                                selected={this.state.startDateBefore} 
                                onChange={date => this.setState({setStartStateBeofre:date})} />
                            <p style={{paddingRight:10, paddingLeft:10}}>ถึง</p>
                            <DatePicker
                                placeholderText={this.state.setStartStateAfter.toLocaleDateString()} 
                                selected={this.state.startDateAfter} 
                                onChange={date => this.setState({setStartStateAfter:date})} />

                        </div>

                        <Table striped style={{width:'95%', alignSelf:'center', marginTop:20}}>
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>รหัสสินค้า</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>ผู้รับผิดชอบ</th>
                                    <th>รับเข้า</th>
                                    <th>ส่งออก</th>
                                    <th>จำนวนที่เหลือ</th>
                                    <th>จำนวนที่เช็คจริง</th>
                                    <th>ตรวจเช็ควันที่</th>
                                    <th>หมายเหตุ</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>110100</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>
                                    <td>ผม ครับ</td>
                                    <td>0</td>
                                    <td>20</td>
                                    <td>100</td>
                                    <td>100</td>
                                    <td>01/01/2563</td>
                                    <td className="CenterTd"> <MdDescription color="#00A3FF" size={25}/> </td>
                                </tr>

                                <tr>
                                    <th scope="row">2</th>
                                    <td>110100</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>
                                    <td>ผม ครับ</td>
                                    <td>0</td>
                                    <td>20</td>
                                    <td>100</td>
                                    <td>100</td>
                                    <td>01/01/2563</td>
                                    <td className="CenterTd"> <MdDescription color="#00A3FF" size={25}/> </td>
                                </tr>

                                <tr>
                                    <th scope="row">3</th>
                                    <td>110100</td>
                                    <td>ข้าวหอมมะลิ ตราสส</td>
                                    <td>ผม ครับ</td>
                                    <td>0</td>
                                    <td>20</td>
                                    <td>100</td>
                                    <td>100</td>
                                    <td>01/01/2563</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25}/></td>
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


export default Company;