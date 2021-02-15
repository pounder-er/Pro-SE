import React from 'react';

import './CompanyDetail.css';

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



class Contact extends React.Component {
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
                    <body className="CDBody">
                        <h3 style={{marginTop:20, 
                                    marginBottom:20, 
                                    width:'95%', 
                                    alignSelf:'center',
                                    color:'white'}}>รายละเอียดบริษัท</h3>
                        
                        <div className="textInputContainer">
                            <div className="textInputLeft">
                                <div className="textInput">
                                    <p className="whiteText">ชื่อบริษัท</p>
                                    <InputGroup>
                                        {/* <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon> */}
                                        <Input placeholder="" />
                                    </InputGroup>
                                </div>
                                <div className="textInput">
                                    <p className="whiteText">ชื่อตัวแทนบริษัท</p>
                                    <InputGroup>
                                        {/* <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon> */}
                                        <Input placeholder="" />
                                    </InputGroup>
                                </div>
                                <div className="textInput">
                                    <p className="whiteText">เบอร์โทรศัพท์</p>
                                    <InputGroup>
                                        {/* <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon> */}
                                        <Input placeholder="" />
                                    </InputGroup>
                                </div>
                                <div className="textInput">
                                    <p className="whiteText">Email</p>
                                    <InputGroup>
                                        {/* <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon> */}
                                        <Input placeholder="" />
                                    </InputGroup>
                                </div>
                                
                            </div>
                            <div className="textInputRight">
                                <div className="textInput">
                                    <p className="whiteText">ชื่อบริษัท</p>
                                    <InputGroup>
                                        {/* <InputGroupAddon addonType="prepend">
                                            <InputGroupText>@</InputGroupText>
                                        </InputGroupAddon> */}
                                        <Input placeholder="" />
                                    </InputGroup>
                                </div>
                                <div className="twoColumn"> 
                                    <div className="textInput" style={{width:'20%'}}>
                                        <p className="whiteText">หมู่</p>
                                        <InputGroup>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon> */}
                                            <Input placeholder="" />
                                        </InputGroup>
                                    </div>
                                    <div className="textInput" style={{width:'65%', marginLeft:'5%'}}>
                                        <p className="whiteText">ถนน</p>
                                        <InputGroup>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon> */}
                                            <Input placeholder="" />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="twoColumn"> 
                                    <div className="textInput" style={{width:'42.5%'}}>
                                        <p className="whiteText">ตำบล/เขต</p>
                                        <InputGroup>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon> */}
                                            <Input placeholder="" />
                                        </InputGroup>
                                    </div>
                                    <div className="textInput" style={{width:'42.5%', marginLeft:'5%'}}>
                                        <p className="whiteText">อำเภอ</p>
                                        <InputGroup>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon> */}
                                            <Input placeholder="" />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="twoColumn"> 
                                    <div className="textInput" style={{width:'42.5%'}}>
                                        <p className="whiteText">จังหวัด</p>
                                        <InputGroup>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon> */}
                                            <Input placeholder="" />
                                        </InputGroup>
                                    </div>
                                    <div className="textInput" style={{width:'42.5%', marginLeft:'5%'}}>
                                        <p className="whiteText">รหัสไปรษณี</p>
                                        <InputGroup>
                                            {/* <InputGroupAddon addonType="prepend">
                                                <InputGroupText>@</InputGroupText>
                                            </InputGroupAddon> */}
                                            <Input placeholder="" />
                                        </InputGroup>
                                    </div>
                                </div>
                            </div>
                            
                        </div>  

                        <div className='editButton'>
                            <Button style={{color:'white', 
                                            backgroundColor:'#FF9900', 
                                            borderColor:'#FF9900',
                                            width:100,
                                            marginRight:'5%'}}>แก้ไข</Button>
                        </div>
                        
                        
                    </body>
                </div>
            </div>
        );
    }
}


export default Contact;