import React from 'react';


import './Branch.css';

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


import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';
import '../node_modules/react-pro-sidebar/dist/css/styles.css';


import { MdSearch, MdDescription } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import { MdMenu,
    MdArchive } from "react-icons/md";

import { IoMdAlarm } from "react-icons/io";

import {
    BsFillLockFill,
    BsFillGrid1X2Fill,
    BsFillArchiveFill,
    BsBriefcaseFill,
    BsFillPeopleFill,
    BsSearch,
    BsCheckAll
} from "react-icons/bs";

import { AiOutlineLineChart,
         AiFillCalculator } from "react-icons/ai";



class Branch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    toggleSideBar=()=>{
        this.setState({collapsed: !this.state.collapsed});
        if(this.state.chartWidth == "500%"){
            this.setState({chartWidth:"550%"});
        }
        else{
            this.setState({chartWidth:"500%"});
        }
    }
    render() {
        return (
            <div className="Container">
                <div className="Sidebar">
                        <MdMenu size={40} 
                                color="gray" 
                                style={{marginLeft:17,
                                        marginTop:12}}
                                onClick={this.toggleSideBar}/>
                        <ProSidebar collapsed={this.state.collapsed}>
                            <Menu iconShape="square" >
                                <MenuItem icon={<BsFillGrid1X2Fill />}>Dashboard</MenuItem>
                                <SubMenu title="จัดการสินค้า" icon={<BsFillArchiveFill />}>
                                    <MenuItem>รายการซื้อสินค้า</MenuItem>
                                    <MenuItem>รายการขายสินค้า</MenuItem>
                                    <MenuItem>เพิ่มสินค้าใหม่</MenuItem>
                                </SubMenu>
                                <MenuItem icon={<BsSearch size={15}/>}>ตรวจสอบสินค้า</MenuItem>
                                <MenuItem icon={<MdArchive size={18}/>}>ประวัติสินค้าเข้า/ออกคลัง</MenuItem>
                                <SubMenu title="ผู้ติดต่อ" icon={<BsBriefcaseFill />}>
                                    <MenuItem>บริษัท</MenuItem>
                                    <MenuItem>สาขา</MenuItem>
                                </SubMenu>
                                <MenuItem icon={<BsFillPeopleFill/>}>จัดการพนักงาน</MenuItem>
                                <MenuItem icon={<BsCheckAll size={17}/>}>เช็ค Stock สินค้า</MenuItem>
                                <MenuItem icon={<IoMdAlarm size={18}/>}>ตั้งเวลาเช็ค Stock ประจำวัน</MenuItem>
                                <MenuItem icon={<AiOutlineLineChart size={18}/>}>ยอดขายสินค้า</MenuItem>
                                <MenuItem icon={<AiFillCalculator size={19}/>}>คำนวนปริมาณการสั่งซื้อสินค้า</MenuItem>
                            </Menu>
                        </ProSidebar>
                </div>
                <div className="Content">
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

                    <body className="Body">
                        <h1 style={{marginTop:20, 
                                    marginBottom:20, 
                                    width:'95%', 
                                    alignSelf:'center'}}>ตรวจสอบสาขา</h1>
                        <div className="Search_Button">
                            <InputGroup style={{width:400}}>
                                <Input placeholder="รหัสสาขา/ชื่อสาขา" />
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
                                    <th>รหัสสาขา</th>
                                    <th>ชื่อสาขา</th>
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


export default Branch;