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




class CompanyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isOpen: false,
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
                    <body className="CDBody">
                        <h1 style={{marginTop:20, 
                                    marginBottom:20, 
                                    width:'95%', 
                                    alignSelf:'center',
                                    color:'white'}}>แก้ไขรายละเอียดบริษัท</h1>
                        
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
                                    <p className="whiteText">ที่อยู่</p>
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
                            <Button color="success"
                                    style={{color:'white', 
                                            // backgroundColor:'#FF9900', 
                                            // borderColor:'#FF9900',
                                            width:100,
                                            marginRight:'5%'}}>บันทึก</Button>
                        </div>
                        
                        
                    </body>
                </div>
            </div>
        );
    }
}


export default CompanyDetail;