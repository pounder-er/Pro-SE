import logo from './logo.svg';
import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/login/Login';
import Manager from './components/manager/Manager';

import { Switch, Route } from 'react-router-dom';

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
  Alert
} from 'reactstrap';

import { BsFillPersonFill, BsFillLockFill, BsFillGrid1X2Fill, BsTextIndentRight } from "react-icons/bs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
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
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem icon={<BsFillGrid1X2Fill />}>Dashboard</MenuItem>
            <SubMenu title="จัดการสินค้า" >
              <MenuItem>รายการซื้อสินค้า</MenuItem>
              <MenuItem>รายการขายสินค้า</MenuItem>
              <MenuItem>เพิ่มสินค้าใหม่</MenuItem>
            </SubMenu>
            <MenuItem >ตรวจสอบสินค้า</MenuItem>
            <MenuItem >ประวัติสินค้าเข้า/ออกคลัง</MenuItem>
            <SubMenu title="ผู้ติดต่อ" >
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
          <Header></Header>
          <Body>
            <Switch>
              <Route path="/manager" component={Manager} />
            </Switch>
          </Body>
        </Content>
      </Container> 
    );
  }
}
export default App;
