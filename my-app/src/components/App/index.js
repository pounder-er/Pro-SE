import logo from './logo.svg';
import './style.css';
import React from 'react';

import { Switch, Route, Link, NavLink } from 'react-router-dom';

import styled from 'styled-components';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu
} from 'react-pro-sidebar';

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
  Alert,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';

import {
  BsFillPersonFill,
  BsFillLockFill,
  BsFillGrid1X2Fill,
  BsFillArchiveFill,
  BsBriefcaseFill
} from "react-icons/bs";
import { CgSidebarOpen, CgSidebar } from "react-icons/cg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,

      isOpen: false
    }
  }

  toggleProfile=()=>{
    this.setState({isOpen:!this.state.isOpen});
  }

  render() {
    const Container = styled.div`
      display: flex;
      align-items: flex-start;
      background-color: #1F1F1F; 
    `;

    const Content = styled.div`
      display: flex;
    flex-direction: column;
    flex-grow: 1;
    /* background-color: rgb(142, 207, 57); */
    height: 100vh;
    `;

    const Header = styled.div`
       display: flex;
    background-color: #46CBE8;
    height: 50px;
    padding: 5px;
    align-items: center;
    `;

    const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
      padding: 2vh;
    flex-grow: 1;
    overflow-y: scroll;
    `;

    return (
      <Container>
        <ProSidebar collapsed={this.state.collapsed} >
          <Menu iconShape="square" >
            <MenuItem icon={<BsFillGrid1X2Fill />}>Dashboard</MenuItem>
            <SubMenu title="จัดการสินค้า" icon={<BsFillArchiveFill />}>
              <MenuItem>รายการซื้อสินค้า</MenuItem>
              <MenuItem>รายการขายสินค้า</MenuItem>
              <MenuItem>เพิ่มสินค้าใหม่</MenuItem>
            </SubMenu>
            <MenuItem >ตรวจสอบสินค้า</MenuItem>
            <MenuItem >ประวัติสินค้าเข้า/ออกคลัง</MenuItem>
            <SubMenu title="ผู้ติดต่อ" icon={<BsBriefcaseFill />}>
              <MenuItem>บริษัท</MenuItem>
              <MenuItem>สาขา</MenuItem>
            </SubMenu>
            <MenuItem >จัดการพนักงาน</MenuItem>
            <MenuItem >เช็ค Stock สินค้า</MenuItem>
            <MenuItem >ตั้งเวลาเช็ค Stock ประจำวัน</MenuItem>
            <MenuItem >ยอดขายสินค้า</MenuItem>
            <MenuItem >คำนวนปริมาณการสั่งซื้อสินค้า</MenuItem>
          </Menu>
        </ProSidebar>
        <Content>
          <Header>
            <div style={{ flex: 1 }}>
              <Button size='sm' color="secondary" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
                {
                  (this.state.collapsed && <CgSidebarOpen size={25} />) ||
                  (!this.state.collapsed && <CgSidebar size={25} />)
                }
              </Button>
            </div>
            <div>
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggleProfile}>
                <DropdownToggle caret >profile</DropdownToggle>
                <DropdownMenu right>
                  <NavLink to="/" activeStyle={{textDecorationLine:'unset'}}><DropdownItem>ออกจากระบบ</DropdownItem></NavLink>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Header>
          <Body>

          </Body>
        </Content>
      </Container>
    );
  }
}
export default App;
