import React from 'react';


import './Contact.css';

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



class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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
                        <h3 style={{marginTop:20, 
                                    marginBottom:20, 
                                    width:'95%', 
                                    alignSelf:'center'}}>ตรวจสอบบริษัท</h3>
                        <div className="Search_Button">
                            <InputGroup style={{width:400}}>
                                <Input placeholder="รหัสบริษัท/ชื่อบริษัท" />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText><MdSearch color="#1F1F1F" size={22}/></InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <Button color="success" style={{width:100}}>เพิ่ม</Button>
                        </div>

                        <Table striped style={{width:'95%', alignSelf:'center', marginTop:20}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>รหัสบริษัท</th>
                                    <th>ชื่อบริษัท</th>
                                    <th>ที่อยู่</th>
                                    <th>เบอร์ติดต่อ</th>
                                    <th>อีเมลล์</th>
                                    <th>ผู้ติดต่อ</th>
                                    <th>รายละเอียด</th>
                                    <th>ลบ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>01</td>
                                    <td>55 จำกัด</td>
                                    <td>99/99 ถ.สุขุมคณิท ต.ทุ่งสุขา อ.ศรีชมพู จ.ชลบุลลี่ 102400</td>
                                    <td>099-999-9999</td>
                                    <td>somsung_ggez@gmail.com</td>
                                    <td>สมซุง กาแลกซี่</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25}/></td>
                                    <td><IoMdTrash color="#FF0000" size={25}/></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>01</td>
                                    <td>55 จำกัด</td>
                                    <td>99/99 ถ.สุขุมคณิท ต.ทุ่งสุขา อ.ศรีชมพู จ.ชลบุลลี่ 102400</td>
                                    <td>099-999-9999</td>
                                    <td>somsung_ggez@gmail.com</td>
                                    <td>สมซุง กาแลกซี่</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25}/></td>
                                    <td><IoMdTrash color="#FF0000" size={25}/></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>01</td>
                                    <td>55 จำกัด</td>
                                    <td>99/99 ถ.สุขุมคณิท ต.ทุ่งสุขา อ.ศรีชมพู จ.ชลบุลลี่ 102400</td>
                                    <td>099-999-9999</td>
                                    <td>somsung_ggez@gmail.com</td>
                                    <td>สมซุง กาแลกซี่</td>
                                    <td className="CenterTd"><MdDescription color="#00A3FF" size={25}/></td>
                                    <td><IoMdTrash color="#FF0000" size={25}/></td>
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