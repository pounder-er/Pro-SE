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
    PaginationLink,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';



import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

import './CustomSideBar.scss';

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



import { BsFillPersonFill} from "react-icons/bs";
import { MdSearch, MdDescription} from "react-icons/md";
// import { MdArchive } from "react-icons/io";



class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    toggleSideBar=()=>{
        this.setState({collapsed: !this.state.collapsed});
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
                    <body className="CDBody">
                        <div className="iconContainer">
                            <Button className="iconBox" 
                                    style={{backgroundColor:"#181818",
                                            border:'none'}}>
                                <div className="iconBorder">
                                    <MdArchive color="white" size={170} style={{margin:15}}/> 
                                </div>
                                <h3 style={{color:'white', marginTop:15}}>บริษัท</h3>
                            </Button>
                            <Button className="iconBox"
                                    style={{backgroundColor:"#181818",
                                            border:'none'}}>
                                <div className="iconBorder">
                                    <MdArchive color="white" size={170} style={{margin:15}}/> 
                                </div>
                                <h3 style={{color:'white', marginTop:15}}>สาขา</h3>
                            </Button> 
                        </div>
                    </body>
                </div>
            </div>
        );
    }
}


export default Contact;