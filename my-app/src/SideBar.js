import React from 'react';

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
    Card
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarContent,
    SidebarFooter
} from 'react-pro-sidebar';

import 'react-pro-sidebar/dist/css/styles.css';
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

import { FaUserCircle } from "react-icons/fa";

import { BiLogOut } from "react-icons/bi"

import styled from 'styled-components';


const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
`;



class SideBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            isOpen: false,
            spaceMargin : '30vh'
        }
    }

    toggleSideBar=()=>{
        this.setState({collapsed: !this.state.collapsed})
    }

    toggleLogoutButton=()=>{
        if(!this.state.collapsed){
            if(this.state.spaceMargin == '30vh'){
                this.setState({spaceMargin:'24.3vh'})
            }
            else{
                this.setState({spaceMargin:'30vh'})
            }
        }
        
    }

    render() {
        return (
                <SideBar>
                        <MdMenu size={40} 
                                color="gray" 
                                style={{marginLeft:17,
                                        marginTop:12}}
                                onClick={this.toggleSideBar}/>
                        <ProSidebar collapsed={this.state.collapsed}>
                            <SidebarContent>
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

                            </SidebarContent>
                            {/* <Space/> */}
                            <div style={{display:'flex', marginTop:this.state.spaceMargin}}></div>
                            <SidebarFooter/>
                            <div style={{display:'flex', width:'100%'}}>
 
                            </div>
                            <Menu>

                                <SubMenu title={
                                            <div>
                                                <span style={{display:'flex', marginLeft:7, color:'white', fontSize:17}}>Hello Kombanwa</span>
                                                <span style={{display:'flex', marginLeft:7}}>Manager</span>
                                            </div> 
                                         } 
                                         icon={<FaUserCircle color="gray" size={45}/>}
                                         onClick={this.toggleLogoutButton}>

                                     <MenuItem icon={<BiLogOut size={19}/>}>
                                         <span style={{display:'flex', color:'#FF0000', fontSize:15}}>ออกจากระบบ</span>
                                     </MenuItem>
                                </SubMenu>
                            </Menu>
                           
   
                        </ProSidebar>
                </SideBar>
        );
    }
}


export default SideBarComponent;