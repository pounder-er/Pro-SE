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
import { IoMdSettings, IoMdCalculator } from "react-icons/io";
import { IoAlarmSharp } from "react-icons/io5";
import { FaWarehouse, FaUserPlus } from "react-icons/fa";

// import { MdPermContactCalendar } from "react-icons/md";
import { RiBarChart2Fill, RiContactsFill } from "react-icons/ri";

import fire_base from '../../firebase/Firebase';

import { connect } from 'react-redux';
import { addSession, addUserProfile } from '../../redux/actions';

import ListEmployee from '../Employees/ListEmployee';
import AddEmployee from '../Employees/AddEmployee';

import HistoryInOut from '../HistoryInOut/HistoryInOut'
import SalesReport from '../SalesReport/SalesReport'
import ProductsReport from '../ProductsReport/ProductReport'
import ProductDetail from '../ProductDetail/ProductDetail'

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

  checkJobTitle = () => {
    let menu = []
    if (this.props.userProfile.jobTitle == 'ผู้จัดการ' || this.props.userProfile.jobTitle == 'ผู้ดูแลระบบ') {
      menu = menu.concat([
        <MenuItem icon={<BsFillGrid1X2Fill />}>
          Dashboard
          <Link onClick={() => this.setState({ headerTitle: 'Dashboard' })} />
        </MenuItem>,
        <SubMenu title="จัดการพนักงาน" icon={<BsFillPeopleFill />}>
          <MenuItem suffix={<FaUserPlus size={18} />} >
            เพิ่มพนักงาน
          <Link to={this.props.match.url + "/add_employee"} onClick={() => this.setState({ headerTitle: 'เพิ่มพนักงาน' })} />
          </MenuItem>
          <MenuItem suffix={<RiContactsFill size={18} />} >
            รายชื่อพนักงาน
          <Link to={this.props.match.url + "/list_employee"} onClick={() => this.setState({ headerTitle: 'รายชื่อพนักงาน' })} />
          </MenuItem>
        </SubMenu>,

        <MenuItem icon={<RiBarChart2Fill size={18} />} >
          ยอดขายสินค้า
          <Link to={this.props.match.url + "/salesReport"} onClick={() => this.setState({ headerTitle: 'ยอดขายสินค้า' })} />
        </MenuItem>,

        <SubMenu title="ตั้งค่า" icon={<IoMdSettings size={18} />}>
          <MenuItem suffix={<IoMdCalculator size={18} />} >คำนวนการสั่งซื้อสินค้า</MenuItem>
          <MenuItem suffix={<IoAlarmSharp size={18} />} >ตั้งเวลาเช็คสต็อก</MenuItem>
        </SubMenu>
      ])
    }
    if (this.props.userProfile.jobTitle == 'ผู้จัดการ' ||
      this.props.userProfile.jobTitle == 'ผู้ดูแลระบบ' ||
      this.props.userProfile.jobTitle == 'เจ้าหน้าที่') {
      menu = menu.concat(
        [

          <SubMenu title="จัดการสินค้า" icon={<BsFillArchiveFill />}>
            <MenuItem>เพิ่มสินค้า<Link onClick={() => this.setState({ headerTitle: 'เพิ่มสินค้าใหม่' })} /></MenuItem>
            <MenuItem >
              รายการสินค้า
            <Link to={this.props.match.url + "/productsReport"} onClick={() => this.setState({ headerTitle: 'ตรวจสอบสินค้า' })} />
            </MenuItem>
            <MenuItem>รายการซื้อสินค้า<Link onClick={() => this.setState({ headerTitle: 'รายการซื้อสินค้า' })} /></MenuItem>
            <MenuItem>รายการขายสินค้า<Link onClick={() => this.setState({ headerTitle: 'รายการขายสินค้า' })} /></MenuItem>
          </SubMenu>,
          <SubMenu title="คลังสินค้า" icon={<FaWarehouse />}>
            <MenuItem >
              ประวัติสินค้าเข้า/ออกคลัง
            <Link to={this.props.match.url + "/historyInOut"} onClick={() => this.setState({ headerTitle: 'ระวัติสินค้าเข้า/ออกคลัง' })} />
            </MenuItem>
            <MenuItem >ผลการเช็คสต๊อกสินค้า<Link onClick={() => this.setState({ headerTitle: 'ผลการเช็คสต๊อกสินค้า' })} /></MenuItem>
          </SubMenu>,

          <SubMenu title="ผู้ติดต่อ" icon={<BsBriefcaseFill />}>
            <MenuItem>บริษัท<Link onClick={() => this.setState({ headerTitle: 'บริษัท' })} /></MenuItem>
            <MenuItem>สาขา<Link onClick={() => this.setState({ headerTitle: 'สาขา' })} /></MenuItem>
          </SubMenu>
        ]
      )
    }
    if (this.props.userProfile.jobTitle == 'พนักงานคลัง') {
      menu = menu.concat(
        [
          <MenuItem >เช็คสต๊อกสินค้า<Link onClick={() => this.setState({ headerTitle: 'เช็คสต๊อกสินค้า' })} /></MenuItem>,
          <MenuItem >นำสินค้าออกจากคลัง<Link onClick={() => this.setState({ headerTitle: 'นำสินค้าออกจากคลัง' })} /></MenuItem>,
          <MenuItem >นำสินค้าเข้าคลัง<Link onClick={() => this.setState({ headerTitle: 'นำสินค้าเข้าคลัง' })} /></MenuItem>,
        ])
    }
    return menu;
  }

  render() {

    return (
      <ContainerHome>
        <Sidebar>

          <ProSidebar collapsed={this.state.collapsed} >
            <SidebarHeader>
              <Menu iconShape="circle" >
                <SubMenu icon={
                  (this.props.userProfile.imageProfile &&
                    (<img src={this.props.userProfile.imageProfile} style={{ height: 50, width: 50, borderRadius: 100 }} />)) ||
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
              <Menu iconShape="circle" popperArrow>
                {this.checkJobTitle()}
              </Menu>
            </SidebarContent>
          </ProSidebar>

        </Sidebar>
        <Content>
          <Header>

            <Button size='sm' style={{ padding: 3, paddingLeft: 4, paddingRight: 4 }} color="secondary" onClick={() => this.setState({ collapsed: !this.state.collapsed })}>
              {
                (this.state.collapsed && <CgSidebarOpen size={25} />) ||
                (!this.state.collapsed && <CgSidebar size={25} />)
              }
            </Button>
            <div style={{ fontSize: 25, color: '#F0FFFF', marginLeft: 10 }}>{this.state.headerTitle}</div>

          </Header>
          <Body>
            <Container style={{ backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
              <Switch>
                <Route exact path={this.props.match.path + "/historyInOut"} component={HistoryInOut} />
                <Route exact path={this.props.match.path + "/salesReport"} component={SalesReport} />
                <Route exact path={this.props.match.path + "/productsReport"} component={ProductsReport} />
                <Route exact path={this.props.match.path + "/productsReport/productDetail"} component={ProductDetail} />
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
    /* height: 3vh; */
    max-height: 60px;
    min-height: 45px;
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