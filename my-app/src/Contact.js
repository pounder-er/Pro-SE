import React from 'react';

import './CompanyDetail.css';
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

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
import { MdSearch, MdDescription, MdArchive } from "react-icons/md";
// import { MdArchive } from "react-icons/io";



class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false
        }
    }

    toggle=()=>{
        this.setState({modal:!this.state.modal});
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
                    <body className="CDBody">
                        <div className="iconContainer">
                            <Button className="iconBox">
                                <div className="iconBorder">
                                    <MdArchive color="white" size={170} style={{margin:15}}/> 
                                </div>
                                <h3 style={{color:'white', marginTop:15}}>บริษัท</h3>
                            </Button>
                            <Button className="iconBox">
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