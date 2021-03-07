import React from 'react';

import {
  Switch,
  Route,
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';

import styled from 'styled-components';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

import {
  BsFillLockFill,
  BsFillGrid1X2Fill,
  BsFillArchiveFill,
  BsBriefcaseFill,
  BsFillPeopleFill,
  BsBoxArrowRight,
  BsPersonFill
} from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { CgSidebarOpen, CgSidebar } from "react-icons/cg";

import fire_base from '../../firebase/Firebase';

import { connect } from 'react-redux';
import { addSession } from '../../redux/actions';

import Employees from '../Employees/Employees';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isOpen: false,
      headerTitle: ''
    }
    // this.arrHeaderTitle = ['รายการซื้อสินค้า',
    //   'รายการขายสินค้า',
    //   'เพิ่มสินค้าใหม่',
    //   'ตรวจสอบสินค้า',
    //   'ประวัติสินค้าเข้า/ออกคลัง',
    //   'บริษัท',
    //   'สาขา',
    //   'เช็ค Stock สินค้า',
    //   'ยอดขายสินค้า'];
    this.checkUser();
  }


  checkUser = () => {
    if (this.props.session) {

    } else {
      this.props.history.push("/");
    }
  }

  toggleProfile = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onLogout = (e) => {
    e.preventDefault();
    fire_base.logOut(this.logOutSuccess, this.logOutUnsuccess);
  }

  logOutSuccess = () => {
    this.props.dispatch(addSession(null));
    this.props.history.push("/");
  }

  logOutUnsuccess = (error) => {
    console.error(error.message);
  }

  render() {
    return (
      <ContainerHome>
        <Sidebar>
          
        <ProSidebar collapsed={this.state.collapsed}>
          <SidebarHeader>
            <Menu iconShape="circle" >
              <SubMenu icon={<BsPersonFill />}
                prefix={
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h5>สมชาย</h5>

                    <label style={{ fontSize: 12 }}>ผู้จัดการ</label>
                  </div>} >
                <MenuItem suffix={<BsBoxArrowRight />} onClick={(e) => this.onLogout(e)}>ออกจากระบบ</MenuItem>
              </SubMenu>
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square" >
              <MenuItem icon={<BsFillGrid1X2Fill />}>Dashboard<Link onClick={() => this.setState({ headerTitle: 'Dashboard' })} /></MenuItem>
              <SubMenu title="จัดการสินค้า" icon={<BsFillArchiveFill />}>
                <MenuItem>รายการซื้อสินค้า<Link onClick={() => this.setState({ headerTitle: 'รายการซื้อสินค้า' })} /></MenuItem>
                <MenuItem>รายการขายสินค้า<Link onClick={() => this.setState({ headerTitle: 'รายการขายสินค้า' })} /></MenuItem>
                <MenuItem>เพิ่มสินค้าใหม่<Link onClick={() => this.setState({ headerTitle: 'เพิ่มสินค้าใหม่' })} /></MenuItem>
              </SubMenu>
              <MenuItem >ตรวจสอบสินค้า<Link onClick={() => this.setState({ headerTitle: 'ตรวจสอบสินค้า' })} /></MenuItem>
              <MenuItem >ประวัติสินค้าเข้า/ออกคลัง<Link onClick={() => this.setState({ headerTitle: 'ระวัติสินค้าเข้า/ออกคลัง' })} /></MenuItem>
              <SubMenu title="ผู้ติดต่อ" icon={<BsBriefcaseFill />}>
                <MenuItem>บริษัท<Link onClick={() => this.setState({ headerTitle: 'บริษัท' })} /></MenuItem>
                <MenuItem>สาขา<Link onClick={() => this.setState({ headerTitle: 'สาขา' })} /></MenuItem>
              </SubMenu>
              <MenuItem icon={<BsFillPeopleFill />}>จัดการพนักงาน<Link to={this.props.match.url + "/employees"} onClick={() => this.setState({ headerTitle: 'จัดการพนักงาน' })} /></MenuItem>
              <MenuItem >เช็ค Stock สินค้า<Link onClick={() => this.setState({ headerTitle: 'เช็ค Stock สินค้า' })} /></MenuItem>
              <MenuItem >ตั้งเวลาเช็ค Stock ประจำวัน</MenuItem>
              <MenuItem >ยอดขายสินค้า<Link onClick={() => this.setState({ headerTitle: 'ยอดขายสินค้า' })} /></MenuItem>
              <MenuItem >คำนวนปริมาณการสั่งซื้อสินค้า</MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
             
        </Sidebar>
        <Content>
          <Header>

            <Button size='sm' color="secondary" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
              {
                (this.state.collapsed && <CgSidebarOpen size={25} />) ||
                (!this.state.collapsed && <CgSidebar size={25} />)
              }
            </Button>
              <div style={{ fontSize: 25, color:'#F0FFFF', marginLeft:10}}>{this.state.headerTitle}</div>
            {/* <div>
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggleProfile}>
                <DropdownToggle caret >profile</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={(e) => this.onLogout(e)}>ออกจากระบบ</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div> */}
          </Header>
          <Body>
            <Container style={{ backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
              <Switch>
                <Route exact path={this.props.match.path + "/employees"} component={Employees} />
              </Switch>
            </Container>
          </Body>
        </Content>
      </ContainerHome>
    );
  }
}

const ContainerHome = styled.div`
      display: flex;
      align-items: flex-start;
      background-color: #1F1F1F; 
    `;

const Sidebar = styled.div`
  display: flex;
  height: 100vh;
  flex-direction:column;
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
      padding: 2vh;
    flex-grow: 1;
    overflow-y: scroll;
    background-color: lightgrey;
    `;


const mapStateToProps = (state) => {
  return {
    session: state.session,
  }
}

export default connect(mapStateToProps)(Home);
