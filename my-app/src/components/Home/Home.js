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
import { addSession, addUserProfile } from '../../redux/actions';

import ListEmployee from '../Employees/ListEmployee';
import AddEmployee from '../Employees/AddEmployee';



class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      isOpen: false,
      headerTitle: '',
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
    //this.props.history.push("/login");
  }

  logOutUnsuccess = (error) => {
    console.error(error.message);
  }

  checkJobTitle = ()=>{
    let menu = []
    if(this.props.userProfile.jobTitle == 'ผู้จัดการ' || this.props.userProfile.jobTitle == 'ผู้ดูแลระบบ'){
      menu = menu.concat([
        <MenuItem icon={<BsFillGrid1X2Fill />}>Dashboard<Link onClick={() => this.setState({ headerTitle: 'Dashboard' })} /></MenuItem>,
        <SubMenu title="จัดการพนักงาน" icon={<BsFillPeopleFill />}>
        <MenuItem>เพิ่มพนักงาน<Link to={this.props.match.url + "/add_employee"} onClick={() => this.setState({ headerTitle: 'เพิ่มพนักงาน' })} /></MenuItem>
        <MenuItem>รายชื่อพนักงาน<Link to={this.props.match.url + "/list_employee"} onClick={() => this.setState({ headerTitle: 'รายชื่อพนักงาน' })} /></MenuItem>
      </SubMenu>,
        <MenuItem >คำนวนปริมาณการสั่งซื้อสินค้า</MenuItem>,
        <MenuItem >ยอดขายสินค้า<Link onClick={() => this.setState({ headerTitle: 'ยอดขายสินค้า' })} /></MenuItem>,
        <MenuItem >ตั้งเวลาเช็ค Stock ประจำวัน</MenuItem>,
      ])
    }
    if(this.props.userProfile.jobTitle == 'ผู้จัดการ' || this.props.userProfile.jobTitle == 'ผู้ดูแลระบบ' || this.props.userProfile.jobTitle == 'เจ้าหน้าที่'){
      menu = menu.concat(
        [
          <MenuItem >ผลการเช็คสต๊อกสินค้า<Link onClick={() => this.setState({ headerTitle: 'ผลการเช็คสต๊อกสินค้า' })} /></MenuItem>,
          <SubMenu title="จัดการสินค้า" icon={<BsFillArchiveFill />}>
            <MenuItem>รายการซื้อสินค้า<Link onClick={() => this.setState({ headerTitle: 'รายการซื้อสินค้า' })} /></MenuItem>
            <MenuItem>รายการขายสินค้า<Link onClick={() => this.setState({ headerTitle: 'รายการขายสินค้า' })} /></MenuItem>
            <MenuItem>เพิ่มสินค้าใหม่<Link onClick={() => this.setState({ headerTitle: 'เพิ่มสินค้าใหม่' })} /></MenuItem>
          </SubMenu>,
          <MenuItem >ตรวจสอบสินค้า<Link onClick={() => this.setState({ headerTitle: 'ตรวจสอบสินค้า' })} /></MenuItem>,     
          <MenuItem >ประวัติสินค้าเข้า/ออกคลัง<Link onClick={() => this.setState({ headerTitle: 'ระวัติสินค้าเข้า/ออกคลัง' })} /></MenuItem>,
          <SubMenu title="ผู้ติดต่อ" icon={<BsBriefcaseFill />}>
            <MenuItem>บริษัท<Link onClick={() => this.setState({ headerTitle: 'บริษัท' })} /></MenuItem>
            <MenuItem>สาขา<Link onClick={() => this.setState({ headerTitle: 'สาขา' })} /></MenuItem>
          </SubMenu>
        ]
      )
    }
    if(this.props.userProfile.jobTitle == 'พนักงานคลัง'){
      menu = menu.concat(
        [
      <MenuItem >เช็คสต๊อกสินค้า<Link onClick={() => this.setState({ headerTitle: 'เช็คสต๊อกสินค้า' })} /></MenuItem>,
     <MenuItem >นำสินค้าออกจากคลัง<Link onClick={() => this.setState({ headerTitle: 'นำสินค้าออกจากคลัง' })} /></MenuItem>,
     <MenuItem >นำสินค้าเข้าคลัง<Link onClick={() => this.setState({ headerTitle: 'นำสินค้าเข้าคลัง' })} /></MenuItem>,
        ])
    }
    console.log(menu);
    return menu;
  }

  render() {
    
    return (
      <ContainerHome>
        <Sidebar>

          <ProSidebar collapsed={this.state.collapsed}>
            <SidebarHeader>
              <Menu iconShape="circle" >
                <SubMenu icon={
                  (this.props.userProfile.imageProfile && (<img src={this.props.userProfile.imageProfile} style={{ height: 50, width: 50, borderRadius: 100 }} />)) ||
                  (!this.props.userProfile.imageProfile && (<BsPersonFill />))
                }
                  prefix={
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h5>{this.props.userProfile.firstName}</h5>
                      <label style={{ fontSize: 12 }}>{this.props.userProfile.jobTitle}</label>
                    </div>} >
                  <MenuItem suffix={<BsBoxArrowRight />} onClick={(e) => this.onLogout(e)}>ออกจากระบบ</MenuItem>
                </SubMenu>
              </Menu>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="square" >
                {this.checkJobTitle()}
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
            <div style={{ fontSize: 25, color: '#F0FFFF', marginLeft: 10 }}>{this.state.headerTitle}</div>
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

                <Route exact path={this.props.match.path + "/list_employee"} component={ListEmployee} />
                <Route exact path={this.props.match.path + "/add_employee"} component={AddEmployee} />
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
    height: 3vw;
    max-height: 50px;
    min-height: 40px;
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
    userProfile: state.userProfile
  }
}

export default connect(mapStateToProps)(Home);
